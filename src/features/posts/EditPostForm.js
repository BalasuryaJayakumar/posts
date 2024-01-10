import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUser } from '../users/usersSlice'
import { deletePost, getPostsById, updatePost } from './postsSlice'
import { useNavigate, useParams } from 'react-router-dom'

const EditPostForm = () => {
    const { postId } = useParams()
    const post = useSelector(state => getPostsById(state, postId))

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const users = useSelector(selectAllUser)
  
    const [ title, setTitle ] = useState(post.title)
    const [ content, setContent ] = useState(post.body)
    const [ userId, setUserId ] = useState(post.userId)
    const [ requestStatus, setRequestStatus ] = useState('idle')
  
    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)
  
    const canSave = [title,content,userId].every(Boolean) && requestStatus === 'idle'
  
    const onSavePostClicked = () => {
      if(canSave){
        try{
          setRequestStatus('pending')
          dispatch(updatePost({id:post.id, title, body:content, userId, reactions:post.reactions}))
          setTitle('')
          setContent('')
          setUserId('')
          navigate(`/post/${post.id}`)
        } catch(err) {
          console.error('Failed to Update Post', err)
        } finally {
          setRequestStatus('idle')
        }
      }
    }

    const onClickDeletePost = () => {
        try {
            dispatch(deletePost({id:post.id}))
            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
        } catch(err) {
            console.error('Failed to Delete Post', err)
        }
    }
  
    const usersOptions = users.map(user => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ))
  
  
  
    return (
      <section>
        <form>
          <h2>Edit Post</h2>
          <label htmlFor="postTitle">Post Title:</label>
          <input 
            type="text" 
            id='postTitle'
            name='postTitle'
            value={title}
            onChange={onTitleChanged}
          />
          <label htmlFor="postAuthor">Author:</label>
          <select 
            id="postAuthor"
            value={userId}
            onChange={onAuthorChanged}  
          >
            <option value=""></option>
            {usersOptions}
          </select>
          <label htmlFor="postContent">Content:</label>
          <textarea 
            name="postContent" 
            id="postContent" 
            value={content}
            onChange={onContentChanged}
          />
          <button
            type='button'
            onClick={onSavePostClicked}
            disabled={!canSave}
          >
            Save Post
          </button>
          <button
            type='button'
            className='deleteButton'
            onClick={onClickDeletePost}
          >
            Delete Post
          </button>
        </form>
      </section>
    )
}

export default EditPostForm