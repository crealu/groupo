import React, { useReducer } from 'react';
import { initialState, reducer, AuthContext } from './context';
import { Routes, Route } from 'react-router-dom';
import Page from './components/Page';
import Dashboard from './components/Dashboard';
import Form from './components/Form';
import './App.css';

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div className="app">
			<AuthContext.Provider value={{state, dispatch}}>
				<Routes>
					<Route path="/" element={<Page />}>
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="form" element={<Form />} />
					</Route>
				</Routes>
			</AuthContext.Provider>
		</div>
	)
}

export default App;
