import { NavLink } from 'react-router-dom';


export default function HomePostCard({user , post}) {
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
                                <NavLink className="details-link" to={"/details/" + post._id}><i className="fa-solid fa-reply"></i></NavLink>
                            </li>
                        ) : <li></li>}
                </ul>
            </div>
        </div>
    )
}