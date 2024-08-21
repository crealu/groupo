import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import Form from './components/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: 'login',
				element: <Form />
			}
		]
	}
]);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<RouterProvider router={router} />);
