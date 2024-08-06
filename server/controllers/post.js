const { Pool } = require('pg');
const pool = new Pool({ database: 'usersdb', port: 5445 });

async function syncSequence() {
	const client = await pool.connect();
	try {
		await client.query('BEGIN');
		const { rows: sequenceRows } = await client.query("SELECT last_value FROM posts_post_id_seq");
		const seqValue = sequenceRows[0].last_value;
		const { rows: maxRows } = await client.query('SELECT MAX(post_id) AS max_post_id FROM posts;');
		const maxPostId = maxRows[0].max_post_id;

		if (seqValue <= maxPostId) {
			await client.query("SELECT setval('posts_post_id_seq', $1)", [maxPostId + 1]);
		}

		await client.query('COMMIT');
	} catch (err) {
		console.log('DB query error: ', err);
		await client.query('ROLLBACK');
	} finally {
		client.release();
	}
}

module.exports = {
	addPost: async (req, res) => {
		await syncSequence();
		let client;
		let now = new Date();
		const post = req.body;

		try {
			client = await pool.connect();
			const cmd = `INSERT INTO posts(user_id, content, created_at) VALUES ($1, $2, $3);`
			const args = [post.user_id, post.content, now];
			const result = await client.query(cmd, args);
			if (result) {
				console.log('Post inserted to database');
			}
			res.send({ msg: 'Post added' });
		} catch (err) {
			console.log('DB query error: ', err);
		} finally {
			client.release();
		}
	},

	getPosts: async (req, res) => {
		let client;
		try {
			client = await pool.connect();
			const cmd = `
				SELECT posts.post_id, posts.content, posts.created_at, users.email
				FROM posts
				JOIN users ON posts.user_id = users.user_id;
			`;
			const result = await client.query(cmd);
			const posts = result.rows;
			res.send(posts);

		} catch (err) {
			console.log('DB query error: ', err);
		} finally {
			client.release();
		}
	}
}