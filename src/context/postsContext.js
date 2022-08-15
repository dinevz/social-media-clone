import { createContext, useEffect, useState } from 'react';
import * as contentService from './../services/contentServices';

export const PostContext = createContext();

export const PostProvider = ({children}) => {
    const [posts, setPosts] = useState([])
  
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
    return (
        <PostContext.Provider
        value={{
            posts,
            update,
        }}>
            {children}
        </PostContext.Provider>
    )
}