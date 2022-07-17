import './Register.css'
import * as authService from '../../services/authService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';

export default function Register() {
    const [step, setStep] = useState(1);
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();
    const {onRegister} = useAuth();

    useEffect(() => {
        if(step === 2) {
            authService.register(userInfo)
            .then(res => {
                onRegister(res);
                setStep(1);
                navigate(`/profile/${res._id}`)
            });
        }
    }, [userInfo, onRegister, step, navigate])

    const registerHandler = (e) => {
        e.preventDefault();
        if(e.target.password.value === e.target.password2.value) {
            setUserInfo(oldState => {
                return {
                    email: e.target.email.value,
                    password: e.target.password.value,
                    ...oldState,
                }
                
            });
        } else {
            alert("password dont match")
        }
    }

    const stepChange = (e) => {
        e.preventDefault();
        let form = e.target.parentElement.parentElement;
        setUserInfo({
            username: form.username.value,
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            imageUrl: form.imageUrl.value,
            about: form.about.value,
        })
        form.username.value = '';
        form.firstName.value = '';
        form.lastName.value= '';
        setStep(step + 1);
    }
    return (
        <div className="register-container">
            <div className="header">
                <h4 className="title">Register<i className="fa-solid fa-user-pen"></i></h4>
            </div>
            {step === 1 ?
                <form method="POST">
                    <div className="container step-1">
                        <label htmlFor="username"><b>Username</b></label>
                        <input id="username" type="text" placeholder="Enter username" name="username" required />

                        <label htmlFor="firstName"><b>First name</b></label>
                        <input id="firstName" type="text" placeholder="eg John" name="firstName" required />
                        <label htmlFor="lastName"><b>Last name</b></label>
                        <input id="lastName" type="text" placeholder="eg Doe" name="lastName" required />
                        <label htmlFor="imageUrl"><b>Image url</b></label>
                        <input id="imageUrl" type="url" placeholder="http://" name="imageUrl" />
                        <label htmlFor="about"><b>About</b></label>
                        <input id="about" type="text" placeholder="keep it short" name="about" required />
                        <button type="button" onClick={(e) => stepChange(e)}>Next</button>
                    </div>
                </form>
                :
                <form method="POST" onSubmit={(e) => registerHandler(e)}>
                    <div className="container step-2">
                        <label htmlFor="email"><b>Email</b></label>
                        <input id="email" type="email" placeholder="Enter email" name="email" required />

                        <label htmlFor="psw"><b>Password</b></label>
                        <input id="password" type="password" placeholder="Enter password" name="psw" required />
                        <label htmlFor="psw2"><b>Confirm password</b></label>
                        <input id="password2" type="password" placeholder="Confirm password" name="psw2" required />

                        <button type="submit">Submit</button>
                    </div>
                </form>
            }


        </div>
    )
}