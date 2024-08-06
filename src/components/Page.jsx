import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context';
import '../App.css';
import Form from './Form';
import Dashboard from './Dashboard';

const Page = () => {
	const {state, dispatch} = useContext(AuthContext);

	const fetchProtected = async () => {
		const token = localStorage.getItem('token');

		if (token) {
			let options = { 
				method: 'POST',
				headers: { 
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
				body: ''
			}

			await fetch('/protected', options)
				.then(res => res.json())
				.then(data => { 
					console.log(data);
					dispatch({ type: 'set user', payload: data});
					dispatch({ type: 'set view', payload: 'Profile'});
				})
				.catch(err => { localStorage.removeItem('token') });
		}
	}

	useEffect(() => { fetchProtected() }, [])

	return (
		<div className="page">
			<h1 className="page-title">Groupomania</h1>
			{ state.user ? <Dashboard /> : <Form /> }
		</div>
	)
}

export default Page;