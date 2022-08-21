import { decode } from "html-entities";
import { NavLink } from "react-router-dom";
import postContentShortener from "../../helpers/postContentShortener";
import { timestampConverter } from "../../helpers/timestampConverter";



export default function DummyHomePostCard({ post, user , dummyComments }) {
    

    
    return (
        <div className="post-container">
            {post._createdOn ? (
                <>
                    <img className="user-avatar" src={post.userImg ? post.userImg : "/assets/images/default_user_icon.jpg"} alt="User" />
                    <div className="post-text-container">
                        <div className="post-text-wrapper">
                            <NavLink className="profile-link" to={'/dummy-profile/' + post._ownerId} >
                                <h6 className="user-info-body">
                                    {post.userFN} {post.userLN}
                                    <span className="small-text">@{post.userUN}</span>
                                    <span className="small-text"> • </span>
                                    <span className="small-text">{timestampConverter(post._createdOn)} ago</span>
                                </h6>
                            </NavLink>
                            {post._updatedOn ? <span className="small-text edited">Edited: {timestampConverter(post._updatedOn)} ago</span> : ''}
                            {post._ownerId === user._id ?
                                <div className="dropdown">
                                    <span className="triple-dots" ><i className="fa-solid fa-ellipsis"></i></span>
                                    <div className="dropdown-content">
                                        <div className="dropdown-content-flex">
                                            <NavLink className="edit-btn" to={'/edit/' + post._id}>Edit</NavLink>
                                        </div>
                                    </div>
                                </div>
                                : ''}
                            
                        </div>
                        <p className="text-body" >{post.content ? decode(postContentShortener(post.content).join('\n')) : ''}</p>
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
                                <NavLink className="details-link comment" to={"/dummy-details/" + post._id}>
                                    <i className="fa-solid fa-comment"></i>
                                    <span className="small-text">{dummyComments.filter(x => x.postId === post._id).length}</span>
                                </NavLink>

                            </li>
                            <li>
                                <div className="like">
                                    <i className="fa-solid fa-heart" style={{
                                        color: '#E52B50'
                                    }}></i>
                                    <span className="small-text">{post.likesCount}</span>
                                </div>
                            </li>
                            {user._id === post._ownerId ?
                                (

                                    <li className="details-li">
                                        <i className="fa-solid fa-trash"></i>
                                    </li>
                                ) : <li></li>}
                        </ul>
                    </div>
                </>
            ) : ''}

        </div>
    )
}