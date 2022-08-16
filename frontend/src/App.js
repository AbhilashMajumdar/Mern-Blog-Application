import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import Blogs from './components/Blogs';
import AddBlog from './components/AddBlog';
import UserBlog from './components/UserBlog';
import Signup from './components/Signup';
import Login from './components/Login';
import EditBlog from './components/EditBlog';
import DeleteBlog from './components/DeleteBlog';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store';

const App = () => {

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.isLoggedIn);

  useEffect(()=>{
    if(localStorage.getItem("userId")){
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          {!isLoggedIn ? <>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} /></> : <>
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/blogs/addblog' element={<AddBlog />} />
            <Route path='/myblogs' element={<UserBlog />} />
            <Route path='/editblog/:id' element={<EditBlog />} />
            <Route path='/deleteblog/:id' element={<DeleteBlog />} />
            <Route path='*' element={<PageNotFound />} /></>}
        </Routes>
      </Router>
    </>
  )
}

export default App
