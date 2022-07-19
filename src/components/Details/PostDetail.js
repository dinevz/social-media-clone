import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';
import { timestampConverter } from '../../helpers/timestampConverter';
import { isAuthenticated } from '../../hoc/isAuthenticated';
import { getPost } from '../../services/contentServices';
import * as commentService from '../../services/commentService';
import Comment from './Comment';


function PostDetail() {
    const { user } = useAuth();
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([{content: ''}]);
    const [commentsCount, setCommentsCount] = useState(0)

    useEffect(() => {
        getPost(user.accessToken, id)
        .then(res => {
            setPost(res)
        })
        .catch(err => {
            console.log(err);
        })
        commentService.getComments(user.accessToken, id)
        .then(res => {
            setComments(res)
        }).catch(err=>{console.log(err);})

        commentService.getCommentCount(user.accessToken, id)
        .then(res => {
            setCommentsCount(res)
        })
        
    }, [user.accessToken, id])


    const postComment = (e) => {
        e.preventDefault();
        let content = e.currentTarget.content.value;
        e.currentTarget.content.value = '';
        commentService.createComment(id, content, user.accessToken)
        .then(res => {
            setCommentsCount(oldState => oldState + 1)
            setComments(oldState => ([
                ...oldState,
                res,
            ]))
        })
    }


    return (
        <div className="home-container">
            <div className="header">
                <h4 className="title">post by {post.userUN} <NavLink className="details-link" to={"/home"}><i className="fa-solid fa-arrow-left"></i></NavLink></h4>
            </div>
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
                        <li>
                            <i className="fa-solid fa-heart"></i>
                            <span className="small-text">10</span>
                        </li>
                        {user.accessToken ?
                            (

                                <li className="details-li">
                                    <NavLink className="details-link" to={"/home"}><i className="fa-solid fa-backward-step"></i></NavLink>
                                </li>
                            ) : <li></li>}
                    </ul>
                </div>
            </div>
            <div className='create-container'>
                {user.accessToken ?
                    (

                        <form id="create-form" method="POST" onSubmit={(e) => postComment(e)}>
                            <div className="form-container">
                                <img src={user.avatar ? user.avatar : "/assets/images/default_user_icon.jpg"} alt="User" />
                                <div className='input-field'>
                                    <textarea type="text"
                                        name="content"
                                        rows="5"
                                        className="form-control"
                                        placeholder="Leave a comment.." >
                                    </textarea>
                                </div>
                            </div>
                            <button type="submit">Comment</button>
                        </form>
                    ) : (
                        <h2 className="home-no-auth">Login or register to post or comment!</h2>
                    )}
            </div>
                {
                    comments.length >= 0 ? comments.sort((a, b) => b._createdOn - a._createdOn)
                .map(x => <Comment key={x._id} comment={x} token={user.accessToken}
            /> ) : ''
                }

  
        </div>
    )
}

export default isAuthenticated(PostDetail);
