import { CLEAR_USERS, GET_USER, GET_USERS, GET_USERS_REPOS, SET_LOADING } from './actionTypes';

export const setLoading = (payload) => ({
	type: SET_LOADING,
	payload,
});

export const getUser = (payload) => ({
	type: GET_USER,
	payload,
});

export const getUsers = (payload) => ({
	type: GET_USERS,
	payload,
});

export const clearUsers = (payload) => ({
	type: CLEAR_USERS,
	payload,
});

export const getUsersRepos = (payload) => ({
	type: GET_USERS_REPOS,
	payload,
});
