import './Profile.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { NavLink, useParams } from 'react-router-dom';
import * as contentService from '../../services/contentServices'

export default function Profile() {
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const [profile, setProfile] = useState({})
    
    useEffect(() => {
        contentService.getProfile(user.accessToken, id)
            .then(result => {
                setProfile(result[0])
            })
            .catch(err => {

            })
    }, [id, user])


    return (
        <div className="profile-container">
            <div className="header">
                <h4 className="title">Profile<i className="fa-solid fa-user fa-fw me-3"></i></h4>
            </div>
            <div className="profile-card-container">
                <img id="profile-img" src={profile.avatar ? profile.avatar : "/assets/images/default_user_icon.jpg"} alt="User" />
                <div className="profile-card-text-container">
                    <p className="user-name">
                        {profile.firstName} {profile.lastName}
                    </p>
                    <p className="user-username">@{profile.username}</p>
                    <p className="user-about">{profile.about}</p>
                </div>
                <div className="user-button-container">
                    {user.id === id ? (<button><NavLink to={'edit-profile'}>Edit profile</NavLink></button>) : ''}
                    <button>Message</button>
                </div>
                <div className="profile-card-stats-container">
                    <div className="stats-container"><p>0</p><p>research</p></div>
                    <div className="stats-container"><p>0</p><p>comments</p></div>
                    <div className="stats-container"><p>0</p><p>likes</p></div>
                </div>
            </div>
            <div className="profile-posts-container">
                <NavLink to="#researches" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Researches</NavLink>
                <NavLink to="#posts" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Posts</NavLink>
                <NavLink to="#activity" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Activity</NavLink>
            </div>
        </div>
    )
}