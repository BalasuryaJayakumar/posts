import React from 'react'
import { useSelector } from 'react-redux'
import { getPostsById } from './postsSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import { Link } from 'react-router-dom'
import ReactionButtons from './ReactionButtons'

const PostExcerpt = ({ postId }) => {

  const post = useSelector(state => getPostsById(state, postId))

  return (
    <article>
      <h2>{post.title}</h2>
      <p className='postExcerpt'>{post.body.substring(0, 75)}...</p>
      <p className='postCredit'>
        <Link to={`post/${post.id}`}>View post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  )
}

export default PostExcerpt