import './Register.css'
import * as authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';


export default function Register({onRegister}) {
    const navigate = useNavigate();

    const registerHandler = (e) => {
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;
        let password2 = e.target.password2.value;

        if(password === password2) {
            authService.register(email, password)
            .then(res => {

                onRegister(res);
                navigate(`/profile/${res._id}`)
                console.log(res);
            })
        } else {
            alert("Password don't match")
        }
    }

    return (
        <div className="register-container">
            <div className="header">
                <h4 className="title">Register<i className="fa-solid fa-user-pen"></i></h4>
            </div>

            <form method="POST" onSubmit={(e) => registerHandler(e)}>
                <div className="container">
                    <label htmlFor="email"><b>Email</b></label>
                    <input id="email" type="text" placeholder="Enter email" name="email" required />

                    <label htmlFor="psw"><b>Password</b></label>
                        <input id="password" type="password" placeholder="Enter password" name="psw" required />
                        <label htmlFor="psw2"><b>Confirm password</b></label>
                        <input id="password2" type="password" placeholder="Confirm password" name="psw2" required />

                            <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}