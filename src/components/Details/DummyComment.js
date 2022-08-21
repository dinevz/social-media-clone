import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import postContentShortener from "../../helpers/postContentShortener"
import { timestampConverter } from "../../helpers/timestampConverter"
import { getDummyProfile } from "../../services/dummyData"

export default function DummyComment({ comment, user, children }) {
    const [profile, setProfile] = useState({
        avatar: '',
        firstName: '',
        lastName: '',

    })

    useEffect(() => {
        let unsubscribed = false;
        getDummyProfile(comment._ownerId)
        .then(res => {
            if(!unsubscribed) {
                setProfile(res)

            }
        })
        return () => {
            unsubscribed = true;
        }
    }, [comment._ownerId])


    return (
        <div className="post-container comments">
            {comment._createdOn ? (
                <>
                    <img className="user-avatar" src={profile.avatar ? profile.avatar : "/assets/images/default_user_icon.jpg"} alt="User" />
                    <div className="post-text-container">
                        <div className="top-link-wrapper">

                        <NavLink className="profile-link" to={'/dummy-profile/' + profile._ownerId} >
                            <h6 className="user-info-body">
                                {profile.firstName} {profile.lastName}
                                <span className="small-text">@{profile.username}</span>
                                <span className="small-text"> • </span>
                                <span className="small-text">{timestampConverter(comment._createdOn)} ago</span>
                                
                            </h6>
                        </NavLink>
                        <span className="small-text"> {children ? children : ''} </span>
                        </div>
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
                            <li>
                                <div className="like">
                                    <i className="fa-solid fa-heart" style={{
                                        color: '#E52B50'
                                    }}></i>
                                    <span className="small-text">{comment.likesCount}</span>
                                </div>
                            </li>
                            <li>
                                {comment._ownerId === user._id
                                    ? <i className="fa-solid fa-trash trash" style={{
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