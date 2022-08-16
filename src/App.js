import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import EditProfile from './components/Profile/EditProfile';
import PostDetail from './components/Details/PostDetail';
import { AuthProvider } from './context/UserContext';
import { PostProvider } from './context/postsContext';
import PostEdit from './components/Edit/PostEdit';

// <CoingeckoWidget /> -> coingecko component
function App() {

  return (
    <div className="App">

      <AuthProvider>
        <PostProvider>
          <Navbar />
          <div className="routes-container">
            <Routes>
              <Route path='home' element={<Home />} />
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='profile/:id/' element={<Profile />} />
              <Route path='profile/:id/edit-profile' element={<EditProfile />} />
              <Route path='details/:id/' element={<PostDetail />} />
              <Route path='edit/:id/' element={<PostEdit />} />
            </Routes>
          </div>
        </PostProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
