import { createContext } from 'react';

export const AuthContext = createContext();

export const initialState = {
	user: null,
	posts: [],
	view: 'profile',
	views: []
}

export function reducer(state, action) {
	switch (action.type) {
		case "set user":
			return {
				...state,
				user: action.payload
			}
			break;
		case "set posts":
			return {
				...state,
				posts: action.payload
			}
			break;
		case 'set view':
			return {
				...state,
				view: action.payload
			}
			break;
		case 'set views':
			return {
				...state,
				views: action.payload
			}
			break;
	}
}