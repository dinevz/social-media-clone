import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import postContentShortener from '../../helpers/postContentShortener';
import { timestampConverter } from '../../helpers/timestampConverter';
import { getCommentCount } from '../../services/commentService';
import { deletePost } from '../../services/contentServices';
import { getLikesCount, like, getIsLiked, dislike } from '../../services/likeService';
import { decode } from 'html-entities';




export default function HomePostCard({ user, post, updatePosts }) {
    const [commentsCount, setCommentsCount] = useState(0);
    const [likesCount, setLikesCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        getCommentCount(user.accessToken, post._id)
            .then(res => {setCommentsCount(res)})
        getLikesCount(user.accessToken, post._id)
        .then(res => {
            setLikesCount(res)
        })
        getIsLiked(user.accessToken, post._id)
        .then(res => {
            if(res.filter(x => x._ownerId === user._id).length > 0) {
                setIsLiked(true)
            }
        })
        
    }, [user.accessToken, post._id, commentsCount, user._id])

    const likeHandler = (e) => {
        e.preventDefault();
        if (!isLiked) {
            like(post._id, user.accessToken)
                .then(res => {
                    setLikesCount(oldState => oldState + 1)
                    setIsLiked(true);
                })
        } else {
            getIsLiked(user.accessToken, post._id)
                .then(res => {
                    let likeId = res.filter(x => x._ownerId === user._id)
                    dislike(likeId[0]._id, user.accessToken)
                        .then(result => {
                            setLikesCount(oldState => oldState - 1)
                            setIsLiked(false);
                        })
                })
        }
    }

    const deletePostHandler = () => {
        deletePost(post._id, user.accessToken)
        .then(res => {
            updatePosts();
        })
    }

    return (
        <div className="post-container">
            <img className="user-avatar" src={post.userImg ? post.userImg : "/assets/images/default_user_icon.jpg"} alt="User" />
            <div className="post-text-container">
                <NavLink className="profile-link" to={'/profile/' + post._ownerId} >
                    <h6 className="user-info-body">
                        {post.userFN} {post.userLN}
                        <span className="small-text">@{post.userUN}</span>
                        <span className="small-text"> • </span>
                        <span className="small-text">{timestampConverter(post._createdOn)} ago</span>
                    </h6>
                </NavLink>
                <p className="text-body" >{decode(postContentShortener(post.content).join('\n'))}</p>
                <div className="media-container home-card">
                    {post.media ?
                        (<>
                            <img className="media" alt="gif/img" src={post.media}></img>
                        </>
                        )
                        : ''}
                </div>
                <ul>
                    <li>
                        <NavLink className="details-link comment" to={"/details/" + post._id}>
                            <i className="fa-solid fa-comment"></i>
                            <span className="small-text">{commentsCount}</span>
                        </NavLink>
                        
                    </li>
                    <li onClick={(e) => likeHandler(e)}>
                        <div className="like">
                            <i className="fa-solid fa-heart" style={{
                                color: isLiked ? '#E52B50' : ''
                            }}></i>
                            <span className="small-text">{likesCount}</span>
                        </div>
                    </li>
                    {user._id === post._ownerId ?
                        (

                            <li className="details-li">
                                <i onClick={() => deletePostHandler()} className="fa-solid fa-trash"></i>
                            </li>
                        ) : <li></li>}
                </ul>
            </div>
        </div>
    )
}