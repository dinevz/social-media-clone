import './PostDetail.css';
import { useContext, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';
import { isAuthenticated } from '../../hoc/isAuthenticated';
import { getPost } from '../../services/contentServices';
import * as commentService from '../../services/commentService';
import Comment from './Comment';
import CreatePost from '../CreatePost/CreatePost';
import HomePostCard from '../Home/HomePostCard';
import { PostContext } from '../../context/postsContext';


function PostDetail() {
    const { user } = useAuth();
    const { update } = useContext(PostContext);
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([{ content: '' }]);


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
            }).catch(err => { console.log(err); })

    }, [user.accessToken, id, user._id])


   

    const setCommentsHandler = (value) => {
        setComments(oldState => ([
            ...oldState,
            value,
        ]))
    }
    const updateCommentsHandler = () => {
        commentService.getComments(user.accessToken, id)
            .then(res => {
                setComments(res)
            }).catch(err => { console.log(err); })
    }
    return (
        <div className="home-container">
            <div className="header">
                <h4 className="title">post by {post.userUN} <NavLink className="details-link-back" to={"/home"}><i className="fa-solid fa-arrow-left"></i></NavLink></h4>
            </div>
            <HomePostCard post={post} user={user} updatePosts={update}/>
            <CreatePost parentClass={'details'} commentObj={{id, setCommentsHandler,}}/>
            {
                comments.length >= 0 ? comments.sort((a, b) => b._createdOn - a._createdOn)
                    .map(x => <Comment className="not-comment" key={x._id} comment={x} user={user} updateComments={updateCommentsHandler}
                    />) : ''
            }


        </div>
    )
}

export default isAuthenticated(PostDetail);
