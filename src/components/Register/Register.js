import './Register.css'
import * as authService from '../../services/authService';
import * as profileService from '../../services/profileService'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';
import Spinner from '../Spinner/Spinner';

export default function Register() {
    const [step, setStep] = useState(1);
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [modalShow, setModalShow] = useState(true);
    const navigate = useNavigate();
    const { onRegister } = useAuth();


    const registerHandler = (e) => {
        e.preventDefault();
        if(e.target.password.value === e.target.password2.value) {
            if(step === 2) {
                authService.register(e.target.email.value, e.target.password.value)
                .then(result => {
                    if(result !== undefined) {
                        profileService.createProfile(userInfo, e.target.email.value, result.accessToken)
                        .then(res => {
                            onRegister({...res}, result.accessToken, result._id);
                            setStep(1);
                            setModalShow(false);
                            navigate(`/profile/${result._id}`);
                            setIsLoading(false);
                        })
                    }
                })
                .catch(err => {
                    if(err.status === 409) {
                        e.target.password.value = '';
                        e.target.password2.value = ''
                        e.target.email.value = ''
                        setStep(1);
                        alert('User with this email already exists');
                    }
                });
            }
        } else {
            alert("password dont match")
        }
    }

    const stepChange = (e) => {
        e.preventDefault();
        let form = e.currentTarget;
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
        <div style={{display: modalShow ? 'block' : 'none'}} className="register-modal">
        <div className="register-modal-content">
            
            
        <div className="register-container">
            <div className="header">
                <h4 className="title">Register<span className="register-close" onClick={() => navigate(-1)}>&times;</span></h4>
            </div>
            {isLoading ? <Spinner /> : step === 1 ?
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
        </div>
        </div>
    )
}