import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUser } from './usersSlice'
import { Link } from 'react-router-dom'

const AuthorList = () => {

  const users = useSelector(selectAllUser)
  const renderedUsers = users.map(user => (
    <li key={user.id}>
      <Link to={`/user/${user.id}`}>{user.name}</Link>
    </li>
  ))

  return (
    <section>
      <h2>Users</h2>
      <ul>{renderedUsers}</ul>
    </section>
  )
}

export default AuthorList