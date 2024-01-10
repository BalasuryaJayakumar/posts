import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUser } from '../users/usersSlice'
import { addNewPost } from './postsSlice'
import { useNavigate } from 'react-router-dom'

const AddNewPost = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const users = useSelector(selectAllUser)

  const [ title, setTitle ] = useState()
  const [ content, setContent ] = useState()
  const [ userId, setUserId ] = useState()
  const [ requestStatus, setRequestStatus ] = useState('idle')

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onAuthorChanged = e => setUserId(e.target.value)

  const canSave = [title,content,userId].every(Boolean) && requestStatus === 'idle'

  const onSavePostClicked = () => {
    if(canSave){
      try{
        setRequestStatus('pending')
        dispatch(addNewPost({title, body: content, userId}))
        setTitle('')
        setContent('')
        setUserId('')
        navigate('/')
      } catch(err) {
        console.error('Failed to save Post', err)
      } finally {
        setRequestStatus('idle')
      }
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
        <h2>Add New Post</h2>
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
      </form>
    </section>
  )
}

export default AddNewPost