import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
	const initialState = {
		users: [],
		loading: false,
	};
	const [state, dispatch] = useReducer(githubReducer, initialState);

	const clearUsers = () =>
		dispatch({
			type: 'CLEAR_USERS',
		});

	// search users
	const searchUsers = async (text) => {
		const params = new URLSearchParams({
			q: text,
		});
		let myHeaders = new Headers();
		myHeaders.append('Authorization', GITHUB_TOKEN);
		var requestOptions = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow',
		};

		try {
			dispatch({
				type: 'SET_LOADING',
				payload: true,
			});
			const response = await fetch(`${GITHUB_URL}/search/users?${params}`, requestOptions);

			// set loading to false
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});

			const { items } = await response.json();

			dispatch({
				type: 'GET_USERS',
				payload: items,
			});
		} catch (error) {
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
			console.log('failed to fetch');
		}
	};

	return (
		<GithubContext.Provider
			value={{ users: state.users, loading: state.loading, searchUsers, clearUsers }}
		>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
