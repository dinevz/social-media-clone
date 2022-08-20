import './Home.css';
import HomePostCard from './HomePostCard';
import { useAuth } from '../../context/UserContext'
import CreatePost from '../CreatePost/CreatePost';
import { useContext, useEffect, useState } from 'react';
import { PostContext } from '../../context/postsContext';
import { getDummyPosts } from '../../services/dummyData';
import DummyHomePostCard from './DummyHomePostCard';
import { getDummyComments } from "../../services/dummyData";

export default function Home() {
    const { user } = useAuth();
    const { posts, update } = useContext(PostContext);
    const [dummyPosts, setDummyPosts] = useState([]);
    const [dummyComments, setDummyComments] = useState([]);

    useEffect(() => {
        getDummyPosts()
        .then(res => {
            setDummyPosts(Object.values(res))
        })
        getDummyComments()
        .then(res => {
            setDummyComments(Object.values(res))
        })
    }, [])


    return (
        <div className="home-container">
            <div className="header">
                <h4 className="title">Latest Posts<i className="fa-solid fa-bolt-lightning"></i></h4>
            </div>
            <CreatePost parentClass={'home'} update={update}/>
            {
        posts.length >= 0 ? posts.sort((a, b) => b._createdOn - a._createdOn)
            .map(post => <HomePostCard key={post._id} user={user} post={post} updatePosts={update}
            />) : ''
    }
            {dummyPosts.length >= 0 ? dummyPosts.sort((a, b) => b._createdOn - a._createdOn)
            .map(dummyPost => <DummyHomePostCard key={dummyPost._id} post={dummyPost} dummyComments={dummyComments} user={user}/>) : ''}
        </div >
    )
}