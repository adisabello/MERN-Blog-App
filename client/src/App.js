import {useQuery} from '@apollo/client'
import PostList from './Components/PostList';
import {Routes, Route} from 'react-router-dom'
import Login from './Components/Login';
import Header from './Utils/Header'
import {LoginContext} from './Contexts/LoginContext'
import {useState} from 'react';
import Register from './Components/Register'
import Logout from './Components/LogOut'
import MyPosts from './Components/MyPosts'

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [userId, setUserId] = useState("")

  return (
    <div className="app">
       <LoginContext.Provider value={{loggedIn, setLoggedIn, userId, setUserId}}>
        <Header />
        <Routes>
          <Route path='/' element={<PostList />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/myposts' element={<MyPosts />}/>
          <Route path='/logout' element={<Logout />}/>
        </Routes>
       </LoginContext.Provider>
  </div>
  );
}

export default App;
