import './PostEdit.css';
import { useNavigate, useParams } from "react-router-dom";
import EmojiPicker from '../CreatePost/EmojiPicker/EmojiPicker';
import GifPicker from '../CreatePost/GifPicker/GifPicker';
import ImageUpload from '../CreatePost/ImageUpload/ImageUpload';
import { decode } from 'html-entities';
import { useContext, useEffect, useState } from 'react';
import { useAuth } from '../../context/UserContext';
import { editPost, getPost } from '../../services/contentServices';
import { PostContext } from '../../context/postsContext';


export default function PostEdit () {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { update } = useContext(PostContext);
    const { id } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        getPost(id)
        .then(res => {
            setPost(res);
        }).catch(err => console.log(err))
    }, [id])

    const contentUpdate = (value) => {
        if (post.content === '') {
            setPost(oldState => ({...oldState, content: value}))
        } else {
            setPost(oldState => ({...oldState, content: oldState.content + value}))
        }
    }

    const mediaUpdate = (value) => {
        setPost(oldState => ({...oldState, media: value}))
    }

    const postEditHandler = (e) => {
        e.preventDefault();
        editPost(user.accessToken, id, post)
        .then(res => {
            update();
            navigate(`/details/${id}`)
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="home-container">
            <div className="header">
                <h4 className="title">Edit <div className="details-link-back edit" onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left"></i></div></h4>
            </div>
            <div className={'create-container'}>
            {user.accessToken ?
                (

                    <>
                        <div className="avatar-container">
                            <img className="user-avatar" src={user.avatar ? user.avatar : "/assets/images/default_user_icon.jpg"} alt="User" />

                        </div>
                        <div className="form-container ">
                            <form id="create-form" method="POST" onSubmit={(e) => postEditHandler(e)}>
                                <div className='input-field'>
                                    <textarea type="text"
                                        name="content"
                                        rows="3"
                                        className="form-control"
                                        placeholder={'Much editing here'}
                                        value={decode(post.content)}
                                        onChange={(e) => setPost(oldState => ({...oldState, content: e.target.value}))}
                                    >
                                    </textarea>
                                    <div className="media-container">
                                        {post.media ? 
                                        (<>
                                            <div onClick={() => setPost(oldState => ({...oldState, media: ''}))} className="close-media"><span className="close">&times;</span></div>
                                            <img className="media" alt="gif/img" src={post.media}></img>
                                        </>
                                        )
                                        : ''}
                                    </div>
                                </div>
                                <input type="submit" id={"edit form-submit"} style={{display: 'none'}}/>
                                </form>
                                
                                <div className="home-buttons-wrappers">
                                    <div className="emoji-buttons-wrappers">
                                        <EmojiPicker contentUpdate={contentUpdate} />
                                        <GifPicker mediaUpdate={mediaUpdate}/>
                                        <ImageUpload />
                                    </div>
                                    <label htmlFor={"edit form-submit"} 
                                    role="button"
                                    disabled={!post.content && !post.media ? true : false}
                                    className={"button " + (!post.content && !post.media ? "disabled" : "typing")}
                                    tabIndex={0}
                                    >{'Edit'}</label>
                                </div>


                        </div>
                    </>

                ) : (
                    <h2 className="home-no-auth">Login or register to post or comment!</h2>
                )}
        </div>
        </div>
    )
}