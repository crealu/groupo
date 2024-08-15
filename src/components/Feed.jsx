import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context';
import '../App.css';
import Posts from './Posts';
import Media from './Media';

const PostButtons = ({ addPost, addMedia }) => {
	return (
		<div>
			<button className="btn btn-primary post-btn" onClick={() => addPost()}>+ New Post</button>
			<button className="btn btn-primary post-btn" onClick={() => addMedia()}>+ New Media</button>
		</div>
	)
}

const AddPostGroup = ({ cancel }) => {
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
			.then(data => { dispatch({ type: 'set posts', payload: data }) })
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
			.then(data => { getPosts() })
			.catch(err => { console.log(err) })
	}

	return (
		<div className="post-form">
			<textarea className="text-input" onChange={(e) => updateText(e)}></textarea>
			<button className="btn btn-primary post-btn" onClick={() => publish()}>Publish</button>
			<button className="btn btn-secondary post-btn" onClick={() => cancel()}>Cancel</button>
		</div>
	)
}

const AddMediaGroup = ({ cancel }) => {
	const {state, dispatch} = useContext(AuthContext);
	const [content, setContent] = useState('');
	const [file, setFile] = useState(null);

	const handleFileChange = (event) => {
		console.log(state.user.email);
		setContent(event.target.files[0].name)
		setFile(event.target.files[0]);
	}

	const upload = async () => {
		const formData = new FormData();
		formData.append('user_id', state.user.user_id);
		formData.append('content', content);
		formData.append('media', file);

		const options = { method: 'POST', body: formData };
		
		await fetch('/addMedia', options)
			.then(res => res.json())
			.then(data => { console.log(data) })
			.catch(err => { console.log(err) })
	}

	return (
		<div className="upload-group">
			<input className="file-input" type="file" onChange={(e) => { handleFileChange(e) }} />
			<button className="btn btn-primary post-btn" onClick={() => upload()}>Upload</button>
			<button className="btn btn-secondary post-btn" onClick={() => cancel()}>Cancel</button>
		</div>
	)
}

const Feed = () => {
	const {state, dispatch} = useContext(AuthContext);
	const [posting, setPosting] = useState(false);
	const [postingType, setPostingType] = useState('text');
	const [contentView, setContentView] = useState('Posts');

	const addPost = () => { 
		setPosting(!posting);
		setPostingType('text') 
	}

	const addMedia = () => { 
		setPosting(!posting);
		setPostingType('media')
	}

	const changeView = (event) => { setContentView(event.target.textContent); }
	const cancelPost = () => { setPosting(false); }

	const activePosts = () => {
		return {
			textDecoration: contentView == 'Posts' ? 'underline' : 'none'
		}
	}	

	const activeMedia = () => {
		return {
			textDecoration: contentView == 'Media' ? 'underline' : 'none'
		}
	}

	const returnGroup = () => {
		return postingType == 'text' 
			? <AddPostGroup cancel={cancelPost} /> 
			: <AddMediaGroup cancel={cancelPost} />;
	}

	return (
		<div className="feed">
			{!posting ? <PostButtons addPost={addPost} addMedia={addMedia} /> : ''}
			{posting && returnGroup()}
			<div className="feed-tabs">
				<button 
					style={activePosts()}
					className="content-btn" 
					onClick={(e) => changeView(e)}
				>
					Posts
				</button>
				<button 
					style={activeMedia()}
					className="content-btn" 
					onClick={(e) => changeView(e)}
				>
					Media
				</button>
			</div>

			{contentView == 'Posts' ? <Posts /> : <Media />}
		</div>
	)
}

export default Feed;