import { createContext, useReducer } from 'react';
import { getUser, getUsers, setLoading } from './actions';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
	const initialState = {
		users: [],
		user: {},
		loading: false,
		repos: [],
	};
	const [state, dispatch] = useReducer(githubReducer, initialState);

	const clearUsers = () => dispatch(clearUsers);

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
			dispatch(setLoading(true));

			const response = await fetch(`${GITHUB_URL}/search/users?${params}`, requestOptions);

			// set loading to false
			dispatch(setLoading(false));

			const { items } = await response.json();
			dispatch(getUsers(items));
		} catch (error) {
			dispatch(setLoading(false));
			console.log('failed to fetch');
		}
	};

	const getUserData = async (login) => {
		const myHeaders = new Headers();

		myHeaders.append('Authorization', GITHUB_TOKEN);

		var requestOptions = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow',
		};

		try {
			dispatch(setLoading(true));

			const response = await fetch(`${GITHUB_URL}/users/${login}`, requestOptions);

			// set loading to false
			dispatch(setLoading(false));
			if (response.status === 404) {
				window.location = '/notfound';
			} else {
				const data = await response.json();
				// call get user action
				dispatch(getUser(data));
			}
		} catch (error) {
			dispatch(setLoading(false));
			console.log('failed to fetch');
		}
	};

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				loading: state.loading,
				repos: state.repos,
				searchUsers,
				clearUsers,
				getUserData,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
