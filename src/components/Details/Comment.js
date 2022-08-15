import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import postContentShortener from "../../helpers/postContentShortener"
import { timestampConverter } from "../../helpers/timestampConverter"
import { deleteComment } from "../../services/commentService"
import * as profileService from "../../services/profileService"

export default function Comment({comment, user, updateComments}) {
    const [profile, setProfile] = useState({
        avatar: '',
        firstName: '',
        lastName: '',

    })
    useEffect(() => {
        profileService.getProfile(user.accessToken, comment._ownerId)
        .then(res => {
            setProfile(res[0])
        })
    }, [comment._ownerId, user.accessToken])

    if(profile === undefined) {
        return (
            <h1>Loading ...</h1>
        )
    }

    const deleteCommentHandler = () => {
        deleteComment(comment._id, user.accessToken)
        .then(res => {
            updateComments();
        })
    }
    return (
        <div className="post-container comments">
                <img src={profile.avatar ? profile.avatar : "/assets/images/default_user_icon.jpg"} alt="User" />
                <div className="post-text-container">
                    <NavLink className="profile-link" to={'/profile/' + profile._ownerId} >
                        <h6 className="user-info-body">
                            {profile.firstName} {profile.lastName}
                            <span className="small-text">@{profile.username}</span>
                            <span className="small-text"> • </span>
                            <span className="small-text">{timestampConverter(comment._createdOn)} ago</span>
                        </h6>
                    </NavLink>
                    <p className="text-body">{comment.content ? postContentShortener(comment.content).join('\n') : 'Loading...'}</p>
                        <ul>
                            <li>
                            </li>
                            <li>
                                <i className="fa-solid fa-heart like"></i>
                                <span className="small-text">0</span>
                            </li>
                            <li>
                                {comment._ownerId === user._id 
                                ? <i onClick={() => deleteCommentHandler()}className="fa-solid fa-trash trash" style={{
                                    cursor: 'pointer',}}></i>
                                : ''}
                                
                            </li>
                        </ul>
                </div>
            </div>
    )
}