import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context';
import '../App.css';

const Posts = () => {
	const {state, dispatch} = useContext(AuthContext);

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

	const getViews = async () => {
		await fetch('/getViews')
			.then(res => res.json())
			.then(data => { dispatch({ type: 'set views', payload: data }) })
			.catch(err => { console.log(err) })
	}

	const viewPost = async (post_id) => {
		let obj = { pid: post_id, uid: state.user.user_id };
		console.log(obj);

		const options = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(obj)
		};

		await fetch('/addView', options)
			.then(res => res.json())
			.then(data => { getViews() })
			.catch(err => { console.log(err) })
	}

	const wasViewed = (post_id) => {
    return state.views.some(view => {
    	return view.post_id === post_id && view.user_id === state.user.user_id
    });
  };

	const setViewedStyle = (post_id) => {
		return wasViewed(post_id) ? { borderRight: 'none' }: { borderRight: '4px solid green' } 
	}

	useEffect(() => { 
		getPosts(); 
		getViews();
	}, [])

	return (
		<div className="posts">
			{state.posts.map((post, idx) => {
				return (
					<div 
						style={setViewedStyle(post.post_id)} 
						className="container post" 
						onClick={() => viewPost(post.post_id)}
					>
						<div className="row post-text">
							<div className="col">{post.content}</div>
						</div>
						<div className="row">
							<div className="col">{post.email}</div>
							<div className="col">{post.created_at.split('T')[0]}</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Posts;