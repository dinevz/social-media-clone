import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../context/UserContext'


export default function PostDetail() {
    const {user} = useContext(UserContext);
    const [post, setPost] = useState({});

    return (
        <div className="post-container">
        <img src={user.imageUrl ? user.imageUrl : "/assets/images/default_user_icon.jpg"} alt="User" />
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
                {user.authToken ?
                    (

                        <li className="details-li">
                            <NavLink className="details-link" to={"/home"}><i className="fa-solid fa-backward-step"></i></NavLink>
                        </li>
                    ) : <li></li>}
            </ul>
        </div>
    </div>
    )
}