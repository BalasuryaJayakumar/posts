import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { selectUserById } from './usersSlice'
import { selectPostsByUser } from '../posts/postsSlice'

const AuthorPage = () => {

  const { userId } = useParams()
  const user = useSelector(state => selectUserById(state, Number(userId)))
  const postsByUserName = useSelector(state => selectPostsByUser(state, Number(userId)))
  const postsTitle = postsByUserName.map(post => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>
        {post.title}
      </Link>
    </li>
  ))

  return (
    <section>
      <h2>{user?.name}</h2>
      <ol>{postsTitle}</ol>
    </section>
  )
}

export default AuthorPage