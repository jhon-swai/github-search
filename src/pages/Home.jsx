import React from 'react'
import UserList from '../components/users/UserList'

import UserSearch from '../components/users/UserSearch'
function Home() {
  return (
    <>
      <h1 className='text-6xl mb-4'>
        <UserSearch />
        <UserList />
      </h1>

    </>
  )
}

export default Home