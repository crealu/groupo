import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context';
import '../App.css';
import Posts from './Posts';
import Media from './Media';

const AddPostButton = ({ addPost }) => {
	return (
		<button className="btn btn-primary" onClick={() => addPost()}>+ New Post</button>
	)
}

const AddPostGroup = () => {
	const {state, dispatch} = useContext(AuthContext);
	const [text, setText] = useState('');

	const updateText = (event) => { setText(event.target.value); }

	const getPosts = async () => {
		let obj = { }

		const options = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(obj)
		};

		await fetch('/getPosts', options)
			.then(res => res.json())
			.then(data => {
					console.log(data);
					dispatch({ type: 'set posts', payload: data })
			})
			.catch(err => { console.log(err) })
	};

	const publish = async () => {
		let obj = { user_id: state.user.user_id, content: text }

		const options = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(obj)
		};

		await fetch('/addPost', options)
			.then(res => res.json())
			.then(data => { 
				console.log(data) 
				getPosts();
			})
			.catch(err => { console.log(err) })
	}

	return (
		<div className="post-form">
			<textarea onChange={(e) => updateText(e)}></textarea>
			<br/>
			<button className="btn btn-primary" onClick={() => publish()}>Publish</button>
		</div>
	)
}

const Feed = () => {
	const {state, dispatch} = useContext(AuthContext);
	const [posting, setPosting] = useState(false);

	const addPost = () => { setPosting(!posting) }

	return (
		<div className="feed">
			{!posting && <AddPostButton addPost={addPost} />}
			{posting && <AddPostGroup />}
			<Media />
			<Posts />
		</div>
	)
}

export default Feed;