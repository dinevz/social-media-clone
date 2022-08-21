import './Login.css';
import * as authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';
import { useState } from 'react';

export default function Login() {
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(true);
    const {onLogin} = useAuth();

    const loginHandler = (e) => {
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;
        authService.login(email, password)
        .then(res => {
            onLogin(res);
            setModalShow(false);
            navigate("/home")
        })
        .catch(err => {
            console.error(err)
        })

    }
    const closeLoginHandler = () => {
        setModalShow(false);
        navigate(-1);
    }

    return (
        <div style={{display: modalShow ? 'block' : 'none'}} className="login-modal">
        <div className="login-modal-content">
            <div className="login-container">
                <div className="login-header">
                    <h4 className="title">Login <span class="close" onClick={() => closeLoginHandler()}>&times;</span></h4>
                </div>

                <form method="POST" onSubmit={(e) => loginHandler(e)}>
                    <div className="container">
                        <label htmlFor="email"><b>Email</b></label>
                        <input id="email" type="text" placeholder="Enter email" name="email" required />

                            <label htmlFor="psw"><b>Password</b></label>
                            <input id="password" type="password" placeholder="Enter password" name="psw" required />

                                <button type="submit">Login</button>
                                <label>
                                    <input type="checkbox" defaultChecked name="remember" /> Remember me
                                </label>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}