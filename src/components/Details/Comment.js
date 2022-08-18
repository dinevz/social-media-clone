import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import postContentShortener from "../../helpers/postContentShortener"
import { timestampConverter } from "../../helpers/timestampConverter"
import { deleteComment } from "../../services/commentService"
import * as profileService from "../../services/profileService"
import { getLikesCount, like, getIsLiked, dislike } from '../../services/likeService';

export default function Comment({ comment, user, updateComments }) {
    const [profile, setProfile] = useState({
        avatar: '',
        firstName: '',
        lastName: '',

    })

    const [likesCount, setLikesCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    useEffect(() => {
        profileService.getProfile(comment._ownerId)
            .then(res => {
                setProfile(res[0])
            })
        getLikesCount(comment._id)
            .then(res => {
                setLikesCount(res)
            })
        getIsLiked(comment._id)
            .then(res => {
                if (res.filter(x => x._ownerId === user._id).length > 0) {
                    setIsLiked(true)
                }
            })
    }, [comment._ownerId, comment._id, user._id])

    const deleteCommentHandler = () => {
        deleteComment(comment._id, user.accessToken)
            .then(res => {
                updateComments();
            })
    }
    const likeHandler = (e) => {
        e.preventDefault();
        if (comment._ownerId === user._id) {
            return
        }
        if (!isLiked) {
            like(comment._id, user.accessToken)
                .then(res => {
                    setLikesCount(oldState => oldState + 1)
                    setIsLiked(true);
                })
        } else {
            getIsLiked(comment._id)
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

    return (
        <div className="post-container comments">
            {comment._createdOn ? (
                <>
                    <img class="user-avatar" src={profile.avatar ? profile.avatar : "/assets/images/default_user_icon.jpg"} alt="User" />
                    <div className="post-text-container">
                        <NavLink className="profile-link" to={'/profile/' + profile._ownerId} >
                            <h6 className="user-info-body">
                                {profile.firstName} {profile.lastName}
                                <span className="small-text">@{profile.username}</span>
                                <span className="small-text"> • </span>
                                <span className="small-text">{timestampConverter(comment._createdOn)} ago</span>
                            </h6>
                        </NavLink>
                        <p className="text-body">{comment.content ? postContentShortener(comment.content).join('\n') : ''}</p>
                        <div className="media-container home-card">
                            {comment.media ?
                                (<>
                                    <img className="media" alt="gif/img" src={comment.media}></img>
                                </>
                                )
                                : ''}
                        </div>
                        <ul>
                            <li>
                            </li>
                            <li onClick={(e) => likeHandler(e)}>
                                <div className="like">
                                    <i className="fa-solid fa-heart" style={{
                                        color: isLiked ? '#E52B50' : ''
                                    }}></i>
                                    <span className="small-text">{likesCount}</span>
                                </div>
                            </li>
                            <li>
                                {comment._ownerId === user._id
                                    ? <i onClick={() => deleteCommentHandler()} className="fa-solid fa-trash trash" style={{
                                        cursor: 'pointer',
                                    }}></i>
                                    : ''}

                            </li>
                        </ul>
                    </div>
                </>
            ) : <h1>Loading</h1>}

        </div>
    )
}