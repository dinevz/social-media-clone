import { NavLink } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
    return (
        <>
        <div className="navbar-container hidden"></div>
        <div className="background-container">
            <div className="landing-form-container">
                <nav className="landing-navbar-noauth">
                    <div className="logo">
                        <NavLink to="/" className="list-group-item list-group-item-action py-2 ripple" aria-current="true">
                            <i className="fa-solid fa-dove"></i>
                        </NavLink>
                    </div>
                    <div className='landing-text-wrapper-navbar'>

                        <p>Taking place now</p>
                        <p>Join Postter today.</p>
                    </div>
                    <div className='landing-link-wrapper'>

                        <NavLink to="/login" className="list-group-item list-group-item-action py-2 ripple">
                            <span>Sign in</span></NavLink>
                        <p>Already have an account ?</p>
                        <NavLink to="/register" className="list-group-item list-group-item-action py-2 ripple">
                            <span>Register with email</span></NavLink>
                    </div>
                </nav>
            </div>
            <div className="footer">
                <div className="about">
                <div className='footer-links'>
                    <a className="link-1" href="/scout">Explore</a>

                    <a href="/">Blog</a>

                    <a href="/">Pricing</a>

                    <a href="/">About</a>

                    <a href="/">Faq</a>

                    <a href="/">Contact</a>
                </div>

                <p>Postter &copy; 2022</p>
            </div>
            <div className="social-media-icons">
                <a target="_blank" rel="noreferrer" href="https://www.facebook.com/"><i className="fa-brands fa-facebook"></i></a>
                <a target="_blank" rel="noreferrer" href="https://www.twitter.com/"><i className="fa-brands fa-twitter"></i></a>
                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/"><i className="fa-brands fa-linkedin"></i></a>
                <a target="_blank" rel="noreferrer" href="https://www.github.com/"><i className="fa-brands fa-github"></i></a>
            </div>
        </div>
        </div >
        </>
    )
}