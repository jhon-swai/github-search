import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {

  const initialState = {
    users: [],
    loading: true
  }
  const [state, dispatch] = useReducer(githubReducer, initialState)


	const fetUsers = async () => {
		let myHeaders = new Headers();
		myHeaders.append('Authorization', GITHUB_TOKEN);
		var requestOptions = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow',
		};

		try {
			const response = await fetch(`${GITHUB_URL}/users`, requestOptions);
			const data = await response.json();
      dispatch({
        type: 'GET_USERS',
        payload: data
      })
      dispatch({
        type: 'SET_LOADING',
        payload: false
      })
      
		} catch (error) {
			console.log('failed to fetch');
		}
	};

	return <GithubContext.Provider value={{ users: state.users, loading: state.loading, fetUsers }}>{children}</GithubContext.Provider>;
};

export default GithubContext;
