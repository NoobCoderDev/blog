import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import DataProvider from './context/DataProvider';
import { useState } from 'react';

import Login from './components/account/Login';
import Signup from './components/account/Signup';
import Home from './components/Home';
import Header from './components/Header';
import CreatePosts from './components/CreatePosts';
import UserBlog from './components/UserBlog';
import BlogDetails from './components/BlogDetails';
import UpdateBlog from './components/UpdateBlog';
import ErrorPage from './components/ErrorPage';
import HomeBlogDetails from './components/HomeBlogDetails';

const PrivateRouter = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? 
  <>
    <Header />
    <Outlet />
  </> :
  <Navigate replace to={'/'} />
}

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState();

  return (
    
    <DataProvider>
      <Routes>
        <Route path='/' element={<Login isUserAuthenticated={isUserAuthenticated}/>} />
          <Route path='/signin' element={<Login isUserAuthenticated={isUserAuthenticated}/>} />
        <Route path='/signup' element={<Signup />} />
        
        <Route path='/home' element={<PrivateRouter isAuthenticated={isAuthenticated}/>} >
          <Route path='/home' element={<Home />} />
        </Route>
        <Route path='*' element={<PrivateRouter isAuthenticated={isAuthenticated}/>} >
          <Route path='*' element={<ErrorPage />} />
        </Route>
        <Route path='/blog/create' element={<PrivateRouter isAuthenticated={isAuthenticated}/>} >
          <Route path='/blog/create' element={<CreatePosts />} />
        </Route>

        <Route path='/user/blog' element={<PrivateRouter isAuthenticated={isAuthenticated}/>} >
          <Route path='/user/blog' element={<UserBlog />} />
        </Route>
        <Route path='/user/blog-details/:id' element={<PrivateRouter isAuthenticated={isAuthenticated}/>} >
          <Route path='/user/blog-details/:id' element={<BlogDetails />} />
        </Route>
        <Route path='/user/update-blog/:id' element={<PrivateRouter isAuthenticated={isAuthenticated}/>} >
          <Route path='/user/update-blog/:id' element={<UpdateBlog />} />
        </Route>
        <Route path='/user/home-blog-details/:id' element={<PrivateRouter isAuthenticated={isAuthenticated}/>} >
          <Route path='/user/home-blog-details/:id' element={<HomeBlogDetails />} />
        </Route>


      </Routes>
    </DataProvider>
  );
}

export default App;