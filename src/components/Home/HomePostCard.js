import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { timestampConverter } from '../../helpers/timestampConverter';
import { getCommentCount } from '../../services/commentService';
import { getLikesCount, like } from '../../services/likeService';


export default function HomePostCard({ user, post }) {
    const [commentsCount, setCommentsCount] = useState(0);
    const [likesCount, setLikesCount] = useState(0);

    useEffect(() => {
        getCommentCount(user.accessToken, post._id)
            .then(res => {setCommentsCount(res)})
        getLikesCount(user.accessToken, post._id)
        .then(res => {setLikesCount(res)})
    }, [user.accessToken, post._id])

    const likeHandler = (e) => {
        e.preventDefault();
        like(post._id, user.accessToken)
        .then(res => {
            setLikesCount(oldState => oldState + 1)
            console.log(res);
        })
    }

    return (
        <div className="post-container">
            <img src={post.userImg ? post.userImg : "/assets/images/default_user_icon.jpg"} alt="User" />
            <div className="post-text-container">
                <NavLink className="profile-link" to={'/profile/' + post._ownerId} >
                    <h6 className="user-info-body">
                        {post.userFN} {post.userLN}
                        <span className="small-text">@{post.userUN}</span>
                        <span className="small-text"> • </span>
                        <span className="small-text">{timestampConverter(post._createdOn)} ago</span>
                    </h6>
                </NavLink>
                <p className="text-body">{post.content}</p>
                <ul>
                    <li>
                        <i className="fa-solid fa-comment"></i>
                        <span className="small-text">{commentsCount}</span>
                    </li>
                    <li onClick={(e) => likeHandler(e)}>
                        <i className="fa-solid fa-heart"></i>
                        <span className="small-text">{likesCount}</span>
                    </li>
                    {user.accessToken ?
                        (

                            <li className="details-li">
                                <NavLink className="details-link" to={"/details/" + post._id}><i className="fa-solid fa-reply"></i></NavLink>
                            </li>
                        ) : <li></li>}
                </ul>
            </div>
        </div>
    )
}