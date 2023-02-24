import { CLEAR_USERS, GET_USER, GET_USERS, GET_USERS_REPOS, SET_LOADING } from './actionTypes';

const githubReducer = (state, action) => {
	switch (action.type) {
		case GET_USERS:
			return {
				...state,
				users: action.payload,
				loading: false
			};
		case SET_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		case CLEAR_USERS:
			return {
				...state,
				users: [],
			};
		case GET_USER:
			return {
				...state,
				user: action.payload,
				loading: false
			};
		case GET_USERS_REPOS:
			return {
				...state,
				repos: action.payload,
				loading: false
			}
		default:
			return state;
	}
};

export default githubReducer;
