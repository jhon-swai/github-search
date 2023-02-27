import { createContext, useReducer } from 'react';
import { clearUsers, getUser, getUsers, getUsersRepos, setLoading } from './actions';
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

	const clearUsersData = () => dispatch(clearUsers());

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

	// get user repos
	const getUserReposData = async (login) => {
		const params = new URLSearchParams({
			sort: 'created_at',
			per_page: 10,
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

			const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, requestOptions);

			const data = await response.json();
			dispatch(getUsersRepos(data));
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
				clearUsersData,
				getUserData,
				getUserReposData,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
