import './Register.css'
import * as authService from '../../services/authService';
import * as profileService from '../../services/profileService'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';

export default function Register() {
    const [step, setStep] = useState(1);
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();
    const { onRegister } = useAuth();

    useEffect(() => {
        if(step === 2) {
            authService.register(userInfo.email, userInfo.password)
            .then(res => {
                onRegister({...res, ...userInfo});
                profileService.createProfile(userInfo, res.accessToken)
                .then(res => {
                    console.log(res);
                })
                setStep(1);
                navigate(`/profile/${res._id}`)
            });
        }
    }, [userInfo, onRegister, step, navigate])

    const registerHandler = (e) => {
        e.preventDefault();
        if(e.target.password.value === e.target.password2.value) {
            if(step === 2) {
                authService.register(e.target.email.value, e.target.password.value)
                .then(res => {
                    onRegister({...res, ...userInfo});
                    profileService.createProfile(userInfo, res.accessToken)
                    .then(res => {
                        console.log(res);
                    })
                    setStep(1);
                    navigate(`/profile/${res._id}`)
                });
            }
        } else {
            alert("password dont match")
        }
    }

    const stepChange = (e) => {
        e.preventDefault();
        let form = e.currentTarget;
        console.log(form.username);
        setUserInfo({
            username: form.username.value,
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            about: form.about.value,
            avatar: '',
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
                <form method="POST" onSubmit={(e) => stepChange(e)}>
                    <div className="container step-1">
                        <label htmlFor="username"><b>Username</b></label>
                        <input id="username" type="text" placeholder="Enter username" name="username" required />

                        <label htmlFor="firstName"><b>First name</b></label>
                        <input id="firstName" type="text" placeholder="eg John" name="firstName" required />
                        <label htmlFor="lastName"><b>Last name</b></label>
                        <input id="lastName" type="text" placeholder="eg Doe" name="lastName" required />
                        <label htmlFor="about"><b>About</b></label>
                        <textarea 
                            type="text"
                            name="about"
                            id="about"
                            rows="5"
                            className="form-control"
                            placeholder="Like where are you from..">
                        </textarea>
                        <button type="submit">Next</button>
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