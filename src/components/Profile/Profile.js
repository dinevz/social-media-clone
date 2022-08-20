import './Profile.css'
import { useContext, useEffect, useState } from 'react'
import { useAuth } from '../../context/UserContext'
import { NavLink, useParams } from 'react-router-dom';
import * as profileService from '../../services/profileService'
import { isAuthenticated } from '../../hoc/isAuthenticated'
import Spinner from '../Spinner/Spinner';
import { getPostByUser } from '../../services/contentServices';
import HomePostCard from '../Home/HomePostCard';
import { getAllComments, getCommentByUser } from '../../services/commentService';
import Comment from '../Details/Comment';
import { PostContext } from '../../context/postsContext';
import { getLikesByUser } from '../../services/likeService';
import { timestampConverter } from '../../helpers/timestampConverter';

const categories = ['Posts', 'Comments', 'Likes']

function Profile() {
    const { user } = useAuth();
    const { id } = useParams();
    const { posts } = useContext(PostContext);
    const [isActive, setIsActive] = useState('Posts');
    const [profile, setProfile] = useState({});
    const [isLoading, setIsLoading] = useState({profile: true, categories: true});
    const [myPosts, setMyPosts] = useState([]);
    const [myComments, setMyComments] = useState([]);
    const [allComments, setAllComments] = useState([]);
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        let unsubscribed = false;
        profileService.getProfile(id)
            .then(result => {
                if (!unsubscribed) {
                    setIsLoading(oldState => ({...oldState, profile: false}));
                    setProfile(result[0])
                }
            })
            .catch(err => {
                console.log(err);
            })
        getAllComments()
        .then(res => {
            setAllComments(res);
        })
        return () => {
            unsubscribed = true;
        }
    }, [id, user])

    useEffect(() => {
        let unsubscribed = false;
        getPostByUser(id)
            .then(res => {
                if (!unsubscribed) {
                    setMyPosts(res);
                    setIsLoading(oldState => ({...oldState, categories: false}));;
                }
            })
            .catch(err => console.log(err))
        getCommentByUser(id)
            .then(res => {
                if (!unsubscribed) {
                    setMyComments(res);
                    setIsLoading(oldState => ({...oldState, categories: false}));
                }
            })
            .catch(err => console.log(err))
        getLikesByUser(id)
        .then(res => {
            
            setLikes(res);
        })
        .catch(err => {
            console.log(err);
        })
        return () => {
            unsubscribed = true;
        }
    }, [id, user, isActive])

    const getPostId = (value) => {
        let d = posts.filter(y => value.postId === y._id)[0]?._id;
        if (d) {
            return `/details/${d}`;
        } else {
            return `/profile/${allComments.filter(y => value.postId === y._id)[0]._ownerId}`
        }
    }

    const getUserId = (value) => {
        return [...allComments, ...posts].filter(x => x._id === value.postId)[0]._ownerId
    }
    const changeCategoryHandler = (value) => {
        setIsActive(value);
        setIsLoading(oldState => ({...oldState, categories: true}));
    }

    const updatePosts = () => {
        getPostByUser(id)
            .then(res => {
                setMyPosts(res);
            })
            .catch(err => console.log(err))
    }

    const updateComments = () => {
        getCommentByUser(id)
            .then(res => {
                setMyComments(res)
            })
    }
    return (
        <div className="profile-container">
            <div className="header">
                <h4 className="title">Profile<i className="fa-solid fa-user fa-fw me-3"></i></h4>
            </div>
            {isLoading.profile ? <Spinner /> : (
                <>
                    <div className="profile-card-container">
                        <img id="profile-img" src={profile?.avatar ? profile?.avatar : "/assets/images/default_user_icon.jpg"} alt="User" />
                        <div className="profile-card-text-container">
                            <p className="user-name">
                                {profile?.firstName} {profile?.lastName}
                            </p>
                            <p className="user-username">@{profile?.username}</p>
                            <p className="user-about">{profile?.about}</p>
                        </div>
                        <div className="user-button-container">
                            {user._id === id ? (<button><NavLink to={'edit-profile'}>Edit profile</NavLink></button>) : ''}
                            <button>Message</button>
                        </div>
                        <div className="profile-card-stats-container">
                            <div className="stats-container"><p>0</p><p>research</p></div>
                            <div className="stats-container"><p>{myPosts.length}</p><p>posts</p></div>
                            <div className="stats-container"><p>{myComments.length}</p><p>comments</p></div>
                        </div>
                    </div>
                    <div className="profile-posts-container">
                        {categories.map(x => (
                            <button key={x} className={'tabs-btn' + (isActive === x ? ' active' : '')} onClick={() => changeCategoryHandler(x)}>{x}</button>
                        ))}
                    </div>
                    {isLoading.categories ? <Spinner /> : 
                    (
                        <>
                        {isActive === 'Posts' && myPosts.length > 0 ? myPosts.map(x => <HomePostCard key={x._id} post={x} user={user} updatePosts={updatePosts} />) : ''}
                        {isActive === 'Comments' && myComments.length > 0 && posts.length > 0 ? 
                        myComments.map(x => 
                            <Comment key={x._id} comment={x} user={user} updateComments={updateComments}>
                                <NavLink className="posted-by" to={`/details/${posts.filter(y => y._id === x.postId)[0]._id}`}>on post by: {posts.filter(y => y._id === x.postId)[0].userUN}</NavLink>
                            </Comment>
                        ) : ''}
                        {isActive === 'Likes' && likes.length > 0 ? likes.map(x => 
                        <p className='small-text' key={x._id}><span className='username-profile'>{profile.username}</span> liked <NavLink className="profile-link-style" to={getPostId(x)}>{x.type}</NavLink> by <NavLink to={'/profile/' + getUserId(x)} className='username-profile'>{x.username}</NavLink> {timestampConverter(x._createdOn)} ago</p>) : ''}
                        </>
                    ) }
                    
                </>)}

        </div>
    )
}

export default isAuthenticated(Profile);