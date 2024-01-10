import Layout from './components/Layout'
import { Navigate, Route, Routes } from "react-router-dom";
import PostsList from './features/posts/PostsList';
import AddNewPost from './features/posts/AddNewPost';
import SinglePage from './features/posts/SinglePage';
import EditPostForm from './features/posts/EditPostForm';
import AuthorList from './features/users/AuthorList';
import AuthorPage from './features/users/AuthorPage';



function App() {
  return (
    <Routes>
      <Route path="/"  element={<Layout />} >
        <Route index element={<PostsList />} />
        <Route path='post'>
          <Route index element={<AddNewPost />} />
          <Route path=':postId' element={<SinglePage />} />
          <Route path='edit/:postId' element={<EditPostForm />} />
        </Route>
        <Route path='user'>
          <Route index element={<AuthorList /> } />
          <Route path=':userId' element={<AuthorPage />} />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  );
}

export default App;
