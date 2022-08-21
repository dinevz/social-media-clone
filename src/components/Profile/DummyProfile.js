import { useEffect, useState } from 'react'
import { useAuth } from '../../context/UserContext'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { getDummyComments, getDummyPosts, getDummyProfile } from '../../services/dummyData';
import DummyHomePostCard from '../Home/DummyHomePostCard';
import DummyComment from '../Details/DummyComment';

const categories = ['Posts', 'Comments', 'Likes']

function Profile() {
    const { user } = useAuth();
    const { id } = useParams();
    const [isActive, setIsActive] = useState(categories[0]);
    const [profile, setProfile] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [dummyComments, setDummyComments] = useState([]);
    const [dummyPosts, setdummyPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getDummyProfile(id)
        .then(res => {
            setProfile(res);
            setIsLoading(false);
        })
        .catch(err => console.log(err))
        getDummyComments()
        .then(res => {
            setDummyComments(Object.values(res).filter(x => x._ownerId === profile._id));
        })
        getDummyPosts()
        .then(res => {
            setdummyPosts(Object.values(res));
        })
    }, [isActive, id, profile._id])

    const changeCategoryHandler = (value) => {
        setIsActive(value);
        setIsLoading(true);
    }

    return (
        <div className="profile-container">
            <div className="header">
                <h4 className="title">Profile<button className="details-link-back" onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left"></i></button></h4>
                
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
                            <div className="stats-container"><p>{dummyPosts.filter(x => x._ownerId === profile._id).length}</p><p>posts</p></div>
                            <div className="stats-container"><p>{dummyComments.length}</p><p>comments</p></div>
                            <div className="stats-container"><p>5</p><p>likes</p></div>
                        </div>
                    </div>
                    <div className="profile-posts-container">
                    {categories.map(x => (
                    <button key={x} className={'tabs-btn' + (isActive === x ? ' active' : '')} onClick={() => changeCategoryHandler(x)}>{x}</button>
                ))}
                    </div>
                    
                    {isActive === 'Posts' ? dummyPosts.filter(x => x._ownerId === profile._id).map(x => <DummyHomePostCard key={x._id} post={x} user={user} dummyComments={dummyComments}/>) : ''}
                    {isActive === 'Comments' && dummyComments.length > 0 && dummyPosts.length > 0 ? 
                        dummyComments.map(x => 
                            <DummyComment key={x._id} comment={x} user={user}>
                                <NavLink className="posted-by" to={`/dummy-details/${dummyPosts.filter(y => x.postId === y._id)[0]._id}`}>on post by: {dummyPosts.filter(y => x.postId === y._id)[0].userUN}</NavLink>
                            </DummyComment>
                        ) : ''}
                    {isActive === 'Likes' ? (
                        <> 
                        <p className='small-text'><span className='username-profile'>{profile.username}</span> liked <NavLink className="profile-link-style" to={'/dummy-details/5f0cfa94-fe10-418c-9504-735e24e11c04'}>post</NavLink> by <NavLink to={'/dummy-profile/ee9823ab-c3e8-4a14-b998-8c22ec246bd3'} className='username-profile'>Tony</NavLink> 1d ago</p>
                        <p className='small-text'><span className='username-profile'>{profile.username}</span> liked <NavLink className="profile-link-style" to={'/dummy-details/50ecd796-3d9d-4f16-b5e6-8e923e2207cc'}>post</NavLink> by <NavLink to={'/dummy-profile/8677c541-4041-4122-9db3-b88caf93e76d'} className='username-profile'>Bob</NavLink> 1d ago</p>
                        <p className='small-text'><span className='username-profile'>{profile.username}</span> liked <NavLink className="profile-link-style" to={'/dummy-details/00d5274f-5fc5-4497-b728-9d7602abe1a9'}>post</NavLink> by <NavLink to={'/dummy-profile/8cd30492-3c55-4864-a1a2-7870e1694116'} className='username-profile'>Ginka</NavLink> 1d ago</p>
                        <p className='small-text'><span className='username-profile'>{profile.username}</span> liked <NavLink className="profile-link-style" to={'/dummy-details/7353e7d5-3db9-4ff8-bbca-33915b668df0'}>post</NavLink> by <NavLink to={'/dummy-profile/562f8422-88cc-47f9-b273-ed12a319d041'} className='username-profile'>Nina</NavLink> 1d ago</p>
                        <p className='small-text'><span className='username-profile'>{profile.username}</span> liked <NavLink className="profile-link-style" to={'/dummy-details/007da5e9-fffd-44b7-b112-e4e9edd3fd48'}>post</NavLink> by <NavLink to={'/dummy-profile/fb352199-bcbc-4e1d-a1dc-ed346a6fb49a'} className='username-profile'>John</NavLink> 1d ago</p>
                        </>
                    ) : ''}
                </>)}


        </div>
    )
}

export default Profile;