import './PostDetail.css';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getPost(id)
            .then(res => {
                setPost(res)
            })
            .catch(err => {
                console.log(err);
            })
        commentService.getComments(id)
            .then(res => {
                setComments(res)
            }).catch(err => { console.log(err); })

    }, [id, user._id])


   

    const setCommentsHandler = (value) => {
        setComments(oldState => ([
            ...oldState,
            value,
        ]))
    }
    const updateCommentsHandler = () => {
        commentService.getComments(id)
            .then(res => {
                setComments(res)
            }).catch(err => { console.log(err); })
    }

    return (
        <div className="home-container">
            <div className="header">
                <h4 className="title">post by {post.userUN} <button className="details-link-back" onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left"></i></button></h4>
            </div>
            <HomePostCard post={post} user={user} updatePosts={update}/>
            <CreatePost parentClass={'details'} commentObj={{id, setCommentsHandler,}}/>
            {
                comments.length > 0 ? comments.sort((a, b) => b._createdOn - a._createdOn)
                    .map(x => <Comment className="not-comment" key={x._id} comment={x} user={user} updateComments={updateCommentsHandler}
                    />) : ''
            }


        </div>
    )
}

export default isAuthenticated(PostDetail);
