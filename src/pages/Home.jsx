import React from 'react'
import UserList from '../components/users/UserList'

function Home() {
  return (
    <div>
      <h1 className='text-6xl mb-4'>
        <UserList />
      </h1>

    </div>
  )
}

export default Home