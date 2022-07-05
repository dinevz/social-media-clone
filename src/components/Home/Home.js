
import './Home.css';
import HomePostCard from './HomePostCard';
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import * as contentService from '../../services/contentServices'

export default function Home() {
    const {user} = useContext(UserContext);
    const [posts, setPosts] = useState([])

    useEffect(() => {
        contentService.getAllPosts()
        .then(res => {
            setPosts(res)
            console.log(res);
        })
    }, [])

    const createPostHandler = (e) => {
        e.preventDefault();
        contentService.createPost(user, e.target.content.value)
        .then(res => {
            setPosts([...posts, res])
            e.target.content.value = '';
            console.log(posts.sort((a, b) => b._createdOn - a._createdOn));
            
        })
    }

    return (
        <div className="home-container">
            <div className="header">
                <h4 className="title">Home<i className="fa-solid fa-bolt-lightning"></i></h4>
            </div>
            <div className='create-container'>
                {user.authToken ? 
                    (

                        <form id="create-form" method="POST" onSubmit={(e) => createPostHandler(e)}>
                            <div className="form-container">
                                <img src={user.imageUrl ? user.imageUrl : "/assets/images/default_user_icon.jpg"} alt="User" />
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
            {posts.sort((a, b) => b._createdOn - a._createdOn)
                .map(post => <HomePostCard key={post._id} user={user} post={post} 
            />)}
        </div>
    )
}