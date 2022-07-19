import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { useAuth } from '../../context/UserContext'
import { isAuthenticated } from '../../hoc/isAuthenticated'
import { getPost } from '../../services/contentServices';

function PostDetail() {
    const { user } = useAuth();
    const { id } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        getPost(user.accessToken, id)
        .then(res => {
            setPost(res)
        })
        .catch(err => {
            console.log(err);
        })
    }, [user.accessToken, id])

    return (
        <div className="home-container">
            <div className="header">
                <h4 className="title">post by {post.userUN} <NavLink className="details-link" to={"/home"}><i className="fa-solid fa-arrow-left"></i></NavLink></h4>
            </div>
            <div className="post-container">
                <img src={user.avatar ? user.avatar : "/assets/images/default_user_icon.jpg"} alt="User" />
                <div className="post-text-container">
                    <NavLink className="profile-link" to={'/profile/' + post._ownerId} >
                        <h6 className="user-info-body">
                            {post.userFN} {post.userLN}
                            <span className="small-text">@{post.userUN}</span>
                            <span className="small-text"> • </span>
                            <span className="small-text">2h</span>
                        </h6>
                    </NavLink>
                    <p className="text-body">{post.content}</p>
                    <ul>
                        <li>
                            <i className="fa-solid fa-comment"></i>
                            <span className="small-text">10</span>
                        </li>
                        <li>
                            <i className="fa-solid fa-heart"></i>
                            <span className="small-text">10</span>
                        </li>
                        {user.accessToken ?
                            (

                                <li className="details-li">
                                    <NavLink className="details-link" to={"/home"}><i className="fa-solid fa-backward-step"></i></NavLink>
                                </li>
                            ) : <li></li>}
                    </ul>
                </div>
            </div>
            <div className='create-container'>
                {user.accessToken ?
                    (

                        <form id="create-form" method="POST">
                            <div className="form-container">
                                <img src={user.avatar ? user.avatar : "/assets/images/default_user_icon.jpg"} alt="User" />
                                <div className='input-field'>
                                    <textarea type="text"
                                        name="content"
                                        rows="5"
                                        className="form-control"
                                        placeholder="..." >
                                    </textarea>
                                </div>
                            </div>
                            <button type="submit">Comment</button>
                        </form>
                    ) : (
                        <h2 className="home-no-auth">Login or register to post or comment!</h2>
                    )}
            </div>
        </div>
    )
}

export default isAuthenticated(PostDetail);
