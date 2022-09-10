import CreatePost from "./CreatePost";
import { useContext } from 'react';
import { PostContext } from '../../context/postsContext';

export default function CreatePostModal() {
    const { update, modalShow, hideModalHandler } = useContext(PostContext);
    
    const ModalComponent = ({show}) => {
        return(
            <div className="create-post-modal" style={{
                display: show ? 'block' : 'none',
            }}>
                
                <div className="create-post-modal-content">
                    <div className="create-post-modal-header">
                        <span onClick={() => hideModalHandler(false)} className="close">&times;</span>
                    </div>
                    
                    <CreatePost parentClass={"modal"} update={update} hideModalHandler={hideModalHandler}/>
                </div>
            </div>
        )
    }
    return (
        <>
        
            <button className="create-modal-btn" onClick={() => hideModalHandler(true)}>Post</button>
            <ModalComponent show={modalShow}/>
        </>

    )
}