import { createContext, useEffect, useState } from 'react';
import * as contentService from './../services/contentServices';

export const PostContext = createContext();

export const PostProvider = ({children}) => {
    const [posts, setPosts] = useState([])
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        update();
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

    const hideModalHandler = (value) => {
        setModalShow(value);
    }

    return (
        <PostContext.Provider
        value={{
            posts,
            update,
            modalShow,
            hideModalHandler,
        }}>
            {children}
        </PostContext.Provider>
    )
}