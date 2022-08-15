import { useState } from "react";
import CreatePost from "./CreatePost";
import { useContext } from 'react';
import { PostContext } from '../../context/postsContext';

export default function CreatePostModal() {
    const [modalShow, setModalShow] = useState(false);
    const { update } = useContext(PostContext);
    
    const hideModalHandler = () => {
        setModalShow(false);
    }
    const ModalComponent = ({show}) => {
        return(
            <div className="modal" style={{
                display: show ? 'block' : 'none',
            }}>
                
                <div className="modal-content">
                    <div className="modal-header">
                        <span onClick={() => hideModalHandler()} className="close">&times;</span>
                    </div>
                    
                    <CreatePost parentClass={"modal"} update={update} hideModalHandler={hideModalHandler}/>
                </div>
            </div>
        )
    }
    return (
        <>
        
            <button className="create-modal-btn" onClick={() => setModalShow(true)}>Post</button>
            <ModalComponent show={modalShow}/>
        </>

    )
}