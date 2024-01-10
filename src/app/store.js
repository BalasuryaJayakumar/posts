import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../features/users/usersSlice' 
import postsReducer from '../features/posts/postsSlice'

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer
    }
})