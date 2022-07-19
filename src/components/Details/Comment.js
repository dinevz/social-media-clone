import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { timestampConverter } from "../../helpers/timestampConverter"
import * as profileService from "../../services/profileService"

export default function Comment({comment, token}) {
    const [profile, setProfile] = useState({
        avatar: '',
        firstName: '',
        lastName: '',

    })
    useEffect(() => {
        profileService.getProfile(token, comment._ownerId)
        .then(res => {
            setProfile(res[0])
        })
    }, [comment._ownerId, token])

    if(profile === undefined) {
        return (
            <h1>Loading ...</h1>
        )
    }
    return (
        <div className="post-container comment">
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
                    <p className="text-body">{comment.content}</p>
                   
                </div>
            </div>
    )
}