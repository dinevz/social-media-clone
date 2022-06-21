
import './Home.css';
import HomePostCard from './HomePostCard';
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

export default function Home() {
    const {user} = useContext(UserContext);
    console.log(user.authToken);
    return (
        <div className="home-container">
            <div className="header">
                <h4 className="title">Home<i className="fa-solid fa-bolt-lightning"></i></h4>
            </div>
            <div className='create-container'>
                {user.authToken ? 
                    (

                        <form id="create-form" method="POST">
                            <div className="form-container">
                                <img src="assets/images/default_user_icon.jpg" alt="User" />
                                <div className='input-field'>
                                    <textarea type="text"
                                        name="create-content"
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
            <HomePostCard user={user} />
            <HomePostCard user={user} />
            <HomePostCard user={user} />
        </div>
    )
}