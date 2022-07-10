import './App.css';
import CoingeckoWidget from "./components/CoingeckoWidget/CoingeckoWidget";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from './components/Home/Home';
import { useState } from 'react';
import { UserContext } from './context/UserContext';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import EditProfile from './components/Profile/EditProfile';
import CreateProfile from './components/CreateProfile/CreateProfile';
import PostDetail from './components/Details/PostDetail';

function App() {
  const [user, setUser] = useState({
    id: '',
    authToken: '',
    username: 'anon',
    firstName: 'John',
    lastName: 'Doe',
    imageUrl: '',
    about: '',
  });
  
  const onLogin = (result) => {
    setUser({
      id: result._id,
      authToken: result.accessToken,
      ...result,
    })
  };
  
  const onLogout = () => {
    setUser({
      id: '',
    authToken: '',
    username: 'anon',
    firstName: 'John',
    lastName: 'Doe',
    })
  }

  const onRegister = (result) =>{
    onLogin(result);
  }  
  
  return (
    <div className="App">
      
      <CoingeckoWidget />
      <UserContext.Provider value={{
        user,
      }}>
        <Navbar onLogout={onLogout}/>
        <div className="routes-container">
          <Routes>
            <Route path='home' element={<Home />} />
            <Route path='login' element={<Login onLogin={onLogin}/>} />
            <Route path='register' element={<Register onRegister={onRegister}/>} />
            <Route path='profile/:id/' element={<Profile />} />
            <Route path='profile/:id/edit-profile' element={<EditProfile />} />
            <Route path='create-profile' element={<CreateProfile />} />
            <Route path='details/:id/' element={<PostDetail />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
