import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getPostsById } from './postsSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

const SinglePage = () => {

  const { postId } = useParams()
  const post = useSelector(state => getPostsById(state, postId))
  
  if(!post) {
    <section>
      <h2>Post Not Found!</h2>
    </section>
  }

  return (
    <article>
      <h2>{post.title}</h2>
      <p className='postExcerpt'>{post.body}</p>
      <p className='postCredit'>
        <Link to={`/post/edit/${post.id}`}>Edit post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  )
}

export default SinglePage