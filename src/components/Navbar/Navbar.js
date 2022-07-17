import './Navbar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import * as authService from '../../services/authService'
import { useAuth } from '../../context/UserContext';


export default function Navbar() {
    const {user, onLogout} = useAuth();
    const navigate = useNavigate()

    const logoutHandler = (e) => {
        e.preventDefault();
        authService.logout(user.authToken);
        navigate('/home');
        onLogout();
    }
    return (
        <div className="navbar-container">
            <nav className="navbar">

                <NavLink to="/home" className="list-group-item list-group-item-action py-2 ripple" aria-current="true">
                    <i className="fa-solid fa-house fa-fw me-3"></i><span>Home</span>
                </NavLink>
                <NavLink to="/research" className="list-group-item list-group-item-action py-2 ripple">
                    <i className="fa-solid fa-book"></i><span>Research</span></NavLink>
                {user.authToken ?
                    (
                        <>
                            <NavLink to={'profile/' + user.id} className="list-group-item list-group-item-action py-2 ripple">
                                <i className="fa-solid fa-user fa-fw me-3"></i><span>Profile</span>
                            </NavLink>
                            <NavLink to="/messages" className="list-group-item list-group-item-action py-2 ripple">
                                <i className="fa-solid fa-message fa-fw me-3"></i><span>Messages</span>
                            </NavLink>
                            <NavLink to="/notifications" className="list-group-item list-group-item-action py-2 ripple">
                                <i className="fa-solid fa-bell fa-fw me-3"></i><span>Notifications</span>
                            </NavLink>
                            <NavLink to="/wallet" className="list-group-item list-group-item-action py-2 ripple">
                                <i className="fa-brands fa-bitcoin fa-fw me-3"></i><span>100,000 sats</span>
                            </NavLink>
                            <a 
                            href='/logout'
                            onClick={(e) => logoutHandler(e)}
                            className="list-group-item list-group-item-action py-2 ripple"> 
                                <i className="fa-solid fa-arrow-right-from-bracket"></i><span>Logout</span>
                            </a>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="list-group-item list-group-item-action py-2 ripple">
                                <i className="fa-solid fa-arrow-right-to-bracket"></i><span>Login</span></NavLink>
                            <NavLink to="/register" className="list-group-item list-group-item-action py-2 ripple">
                                <i className="fa-solid fa-user-pen"></i><span>Register</span></NavLink>
                        </>
                    )}
            </nav>
        </div>
    )
}