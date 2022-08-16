import './Home.css';
import HomePostCard from './HomePostCard';
import { useAuth } from '../../context/UserContext'
import CreatePost from '../CreatePost/CreatePost';
import { useContext } from 'react';
import { PostContext } from '../../context/postsContext';


export default function Home() {
    const { user } = useAuth();
    const { posts, update } = useContext(PostContext);
    


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
        </div >
    )
}