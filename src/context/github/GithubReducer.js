import { CLEAR_USERS, GET_USER, GET_USERS, SET_LOADING } from './actionTypes';

const githubReducer = (state, action) => {
	switch (action.type) {
		case GET_USERS:
			return {
				...state,
				users: action.payload,
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
			};
		default:
			return state;
	}
};

export default githubReducer;
