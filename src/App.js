import './App.css';
import CoingeckoWidget from "./components/CoingeckoWidget/CoingeckoWidget";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from './components/Home/Home';
import { useState, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import Login from './components/Login/Login';

function App() {
  const [user, setUser] = useState({
    authToken: '',
    username: 'anon',
    firstName: 'John',
    lastName: 'Doe',
  });
  
  const onLogin = (result) => {
    setUser({
      ...user,
      authToken: result,
    })
  };
  return (
    <div className="App">
      
      <CoingeckoWidget />
      <UserContext.Provider value={{
        user,
      }}>
        <Navbar />
        <div className="routes-container">
          <Routes>
            <Route path='home' element={<Home />} />
            <Route path='login' element={<Login onLogin={onLogin}/>} />
          </Routes>
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
