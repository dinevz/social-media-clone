import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';
import CreatePost from '../CreatePost/CreatePost';
import { getDummyComments, getDummyPosts } from '../../services/dummyData';
import DummyHomePostCard from '../Home/DummyHomePostCard';
import DummyComment from './DummyComment';


function DummyPostDetail() {
    const { user } = useAuth();
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [dummyComments, setDummyComments] = useState([{ content: '' }]);
    const navigate = useNavigate();

    useEffect(() => {
        getDummyPosts()
        .then(res => {
            setPost(Object.values(res).filter(x => x._id === id)[0]);
        })
        getDummyComments()
        .then(res => {
            setDummyComments(Object.values(res).filter(x => x.postId === id))
        })
    }, [id, user._id])


   

    const setCommentsHandler = (value) => {
        setDummyComments(oldState => ([
            ...oldState,
            value,
        ]))
    }

    return (
        <div className="home-container">
            <div className="header">
                <h4 className="title">post by {post.userUN} <button className="details-link-back" onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left"></i></button></h4>
            </div>
            <DummyHomePostCard post={post} user={user} dummyComments={dummyComments}/>
            <CreatePost parentClass={'details'} commentObj={{id, setCommentsHandler,}}/>
            {
                dummyComments.length > 0 ? dummyComments.sort((a, b) => b._createdOn - a._createdOn)
                    .map(x => <DummyComment className="not-comment" key={x._id} comment={x} user={user}/>) : ''
            }


        </div>
    )
}

export default DummyPostDetail;
