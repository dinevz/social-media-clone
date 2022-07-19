import './App.css';
import CoingeckoWidget from "./components/CoingeckoWidget/CoingeckoWidget";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import EditProfile from './components/Profile/EditProfile';
import PostDetail from './components/Details/PostDetail';
import { AuthProvider } from './context/UserContext';

function App() {
  
  return (
    <div className="App">
      
      <CoingeckoWidget />
      <AuthProvider>
        <Navbar />
        <div className="routes-container">
          <Routes>
            <Route path='home' element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='profile/:id/' element={<Profile />} />
            <Route path='profile/:id/edit-profile' element={<EditProfile />} />
            <Route path='details/:id/' element={<PostDetail />} />
          </Routes>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
