import { NavLink } from 'react-router-dom';


export default function HomePostCard({ user, post }) {
    const msToTime = (ms) => {
        let seconds = (ms / 1000).toFixed(0);
        let minutes = (ms / (1000 * 60)).toFixed(0);
        let hours = (ms / (1000 * 60 * 60)).toFixed(0);
        let days = (ms / (1000 * 60 * 60 * 24)).toFixed(0);
        let weeks = (ms / (1000 * 60 * 60 * 24 * 7)).toFixed(0);

        if( weeks >= 1) {
            return weeks + 'w'
        } else if(days >= 1) {
            return days + 'd'
        } else if( hours >= 1) {
            return hours + 'h'
        } else if(minutes >= 1) {
            return minutes + 'm'
        } else {
            return seconds + 's'
        }

    }
    const timestampConverter = (timestamp) => {
        let timeNow = new Date();
        let timePosted = new Date(timestamp);
        let elapsedTime = timeNow.getTime() - timePosted.getTime();

        return msToTime(elapsedTime);
    }
    return (
        <div className="post-container">
            <img src={user.imageUrl ? user.imageUrl : "/assets/images/default_user_icon.jpg"} alt="User" />
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