import { useEffect, useState } from 'react'
import { useAuth } from '../../context/UserContext'
import { NavLink, useParams } from 'react-router-dom';
import * as profileService from '../../services/profileService'
import { isAuthenticated } from '../../hoc/isAuthenticated'
import Spinner from '../Spinner/Spinner';
import { getDummy, getDummyProfile } from '../../services/dummyData';
import DummyHomePostCard from '../Home/DummyHomePostCard';

const categories = ['Posts', 'Comments', 'Likes']

function Profile() {
    const { user } = useAuth();
    const { id } = useParams();
    const [isActive, setIsActive] = useState(categories[0]);
    const [profile, setProfile] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        getDummyProfile(id)
        .then(res => {
            setProfile(res);
            setIsLoading(false);
        })
        .catch(err => console.log(err))
        getDummy(isActive.toLowerCase())
        .then(res => {
            setCategory(Object.values(res).filter(x => x._ownerId === profile._id));
        })
    }, [isActive, id, profile._id])

    
    const changeCategoryHandler = (value) => {
        setIsActive(value);
        setIsLoading(true);
    }

    return (
        <div className="profile-container">
            <div className="header">
                <h4 className="title">Profile<i className="fa-solid fa-user fa-fw me-3"></i></h4>
            </div>
            {isLoading ? <Spinner /> : (
                <>
                    <div className="profile-card-container">
                        <img id="profile-img" src={profile?.avatar ? profile.avatar : "/assets/images/default_user_icon.jpg"} alt="User" />
                        <div className="profile-card-text-container">
                            <p className="user-name">
                                {profile.firstName} {profile.lastName}
                            </p>
                            <p className="user-username">@{profile.username}</p>
                            <p className="user-about">{profile.about}</p>
                        </div>
                        <div className="user-button-container">
                            {user._id === id ? (<button><NavLink to={'edit-profile'}>Edit profile</NavLink></button>) : ''}
                            <button>Message</button>
                        </div>
                        <div className="profile-card-stats-container">
                            <div className="stats-container"><p>0</p><p>research</p></div>
                            <div className="stats-container"><p>{profile?.postsCount || 0}</p><p>posts</p></div>
                            <div className="stats-container"><p>{profile?.commentsCount || 0}</p><p>comments</p></div>
                        </div>
                    </div>
                    <div className="profile-posts-container">
                    {categories.map(x => (
                    <button key={x} className={'tabs-btn' + (isActive === x ? ' active' : '')} onClick={() => changeCategoryHandler(x)}>{x}</button>
                ))}
                    </div>
                    
                    {isActive === 'Posts' ? category.map(x => <DummyHomePostCard post={x} user={user} dummyComments={[]}/>) : ''}
                </>)}


        </div>
    )
}

export default isAuthenticated(Profile);