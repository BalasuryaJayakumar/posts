import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUser } from '../users/usersSlice'

const PostAuthor = ({ userId }) => {

  const users = useSelector(selectAllUser)
  const author = users.find(user => user.id === userId)

  return (
    <span>
      by { author ? author.name : 'Unknown Author' }
    </span>
  )
}

export default PostAuthor