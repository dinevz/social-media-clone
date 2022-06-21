import { NavLink } from 'react-router-dom';


export default function HomePostCard({user}) {
    return (
        <div className="post-container">
            <img src="assets/images/default_user_icon.jpg" alt="User" />
            <div className="post-text-container">
                <NavLink className="profile-link" to="/user-profile" >
                    <h6 className="user-info-body">
                        FirstName LastName
                        <span className="small-text">@username</span>
                        <span className="small-text"> • </span>
                        <span className="small-text">2h</span>
                    </h6>
                </NavLink>
                <p className="text-body">Lorem ipsum dolor, sit amet #consectetur adipisicing elit. Nobis assumenda eveniet ipsum libero mollitia vero doloremque#perspiciatis molestiae omnis, quam iure dicta reprehenderit distinctio facere labore atque, sit #ratione qu</p>
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
                                <NavLink className="details-link" to="/details/">Comment</NavLink>
                            </li>
                        ) : ''}
                </ul>
            </div>
        </div>
    )
}