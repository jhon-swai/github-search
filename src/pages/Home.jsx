import React from 'react';
import UserList from '../components/users/UserList';

import UserSearch from '../components/users/UserSearch';
function Home() {
	return (
		<>
			<UserSearch />
			<UserList />
		</>
	);
}

export default Home;
