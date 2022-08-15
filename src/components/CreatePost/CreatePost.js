import './CreatePost.css';
import EmojiPicker from './EmojiPicker/EmojiPicker';
import { decode } from 'html-entities';
import GifPicker from './GifPicker/GifPicker';
import { useAuth } from '../../context/UserContext';
import { useState } from 'react';
import * as contentService from '../../services/contentServices';
import ImageUpload from './ImageUpload/ImageUpload';

export default function CreatePost({update, parentClass, hideModalHandler}) {
    const { user } = useAuth();
    const [postContent, setPostContent] = useState('');
    const [postMedia, setPostMedia] = useState('');

    const contentUpdate = (value) => {
        if (postContent === '') {
            setPostContent(value)
        } else {
            setPostContent(old => old + value)
        }
    }

    const mediaUpdate = (value) => {
        setPostMedia(value);
    }

    const createPostHandler = (e) => {
        e.preventDefault();
        if (e.target.content.value === '') {
            return alert('Type something')
        }
        contentService.createPost(user, postContent, postMedia)
            .then(res => {
                setPostContent('');
                setPostMedia('');
                update();
                hideModalHandler();
            }).catch(err => {
                // console.log(err);
            })
    }
    return (
        <div className='create-container'>
            {user.accessToken ?
                (

                    <>
                        <div className="avatar-container">
                            <img className="user-avatar" src={user.avatar ? user.avatar : "/assets/images/default_user_icon.jpg"} alt="User" />

                        </div>
                        <div className="form-container">
                            <form id="create-form" method="POST" onSubmit={(e) => createPostHandler(e)}>
                                <div className='input-field'>
                                    <textarea type="text"
                                        name="content"
                                        rows="3"
                                        className="form-control"
                                        placeholder="What's going on?"
                                        value={decode(postContent)}
                                        onChange={(e) => setPostContent(e.target.value)}
                                    >
                                    </textarea>
                                    <div className="media-container">
                                        {postMedia ? 
                                        (<>
                                            <div onClick={() => setPostMedia('')} className="close-media"><span className="close">&times;</span></div>
                                            <img className="media" alt="gif/img" src={postMedia}></img>
                                        </>
                                        )
                                        : ''}
                                    </div>
                                </div>
                                <input type="submit" id={parentClass + "form-submit"} style={{display: 'none'}} />
                                </form>
                                <div className="home-buttons-wrappers">
                                    <div className="emoji-buttons-wrappers">
                                        <EmojiPicker contentUpdate={contentUpdate} />
                                        <GifPicker mediaUpdate={mediaUpdate}/>
                                        <ImageUpload />
                                    </div>
                                    <label htmlFor={parentClass + "form-submit"} 
                                    role="button"
                                    className={"button " + (!postContent && !postMedia ? "disabled" : "typing")}
                                    tabIndex={0}
                                    >Post</label>
                                </div>


                        </div>
                    </>

                ) : (
                    <h2 className="home-no-auth">Login or register to post or comment!</h2>
                )}
        </div>
    )
}