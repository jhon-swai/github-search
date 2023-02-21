import React, { useContext } from 'react';
import GithubContext from '../../context/github/GithubContext';
import Loading from '../common/Loading';
import UserItem from './UserItem';

function UserList() {
	const { users, loading } = useContext(GithubContext);

	return (
		<>
			{!loading ? (
				<div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
					{users?.map((user) => (
						<UserItem key={user.id} user={user} />
					))}
				</div>
			) : (
				<Loading />
			)}

			{loading}
		</>
	);
}

export default UserList;
