
import './Home.css';
import HomePostCard from './HomePostCard';
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/UserContext'
import * as contentService from '../../services/contentServices'

export default function Home() {
    const {user} = useAuth();
    const [posts, setPosts] = useState([])

    
    useEffect(() => {
        update();
        setInterval(update, 5000);
    }, [])

    const update = () => {
        contentService.getAllPosts()
        .then(res => {
            setPosts(res);
        })
        .catch(err => {
            // console.error(err);
        })
    }
    const createPostHandler = (e) => {
        e.preventDefault();
        contentService.createPost(user, e.target.content.value)
        .then(res => {
            console.log(res);
            update();
            e.target.content.value = '';
            
        }).catch(err => {
            // console.log(err);
        })
    }


    return (
        <div className="home-container">
            <div className="header">
                <h4 className="title">Home<i className="fa-solid fa-bolt-lightning"></i></h4>
            </div>
            <div className='create-container'>
                {user.accessToken ? 
                    (

                        <form id="create-form" method="POST" onSubmit={(e) => createPostHandler(e)}>
                            <div className="form-container">
                                <img src={user.avatar ? user.avatar : "/assets/images/default_user_icon.jpg"} alt="User" />
                                <div className='input-field'>
                                    <textarea type="text"
                                        name="content"
                                        rows="5"
                                        className="form-control"
                                        placeholder="What's on your mind" >
                                    </textarea>
                                </div>
                            </div>
                            <button type="submit">Post</button>
                        </form>
                    ) : (
                        <h2 className="home-no-auth">Login or register to post or comment!</h2>
                    )}
            </div>
            {posts.length >= 0 ? posts.sort((a, b) => b._createdOn - a._createdOn)
                .map(post => <HomePostCard key={post._id} user={user} post={post} 
            /> ) : ''}
        </div>
    )
}