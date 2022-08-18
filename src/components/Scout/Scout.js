import './Scout.css';
import { Overlay, Popover } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import Spinner from '../Spinner/Spinner';
import { getNews } from '../../services/bingSearchService';
import { searchByUsername } from '../../services/profileService';
import { useAuth } from '../../context/UserContext';
import { NavLink } from 'react-router-dom';

const categories = [
    { category: 'World news', icon: 'fa-solid fa-globe' },
    { category: 'Crypto news', icon: 'fa-brands fa-bitcoin' },
    { category: 'Sports', icon: 'fa-solid fa-globe' },
    { category: 'Entertainment', icon: 'fa-solid fa-globe' },
    { category: 'Health', icon: 'fa-solid fa-globe' },]

export default function Scout() {
    const [isActive, setIsActive] = useState(categories[0]);
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchUserModal, setSearchUserModal] = useState(false);
    const [searchResult, setSearchResult] = useState(null);

    const { user } = useAuth();
    const ref = useRef(null);
    const target = useRef(null);
    
    useEffect(() => {
        let unsubscribed = false;
        getNews(isActive.category)
            .then(res => {
                if (!unsubscribed) {
                    setNews(res.value);
                    setIsLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
            })
        return () => {
            unsubscribed = true;
        }
    }, [isActive])

    const changeCategoryHandler = (value) => {
        setIsActive(value);
        setNews([]);
        setIsLoading(true);
    }

    const searchUser = (username) => {
        searchByUsername(user.accessToken, username)
        .then(res => {
            setSearchResult(res[0]);
            setSearchUserModal(target.current.value.length > 0);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const deleteSearch = () => {
        setSearchResult(null);
        setSearchUserModal(true);
        target.current.value = '';
    }

    const closeSearchModal = () => {
        setSearchResult(null);
        setSearchUserModal(false);
        target.current.value = '';
    }
    return (
        <div className="home-container">
            <div className="header">
                <form ref={ref} className="scout-searchbar-form" autocomplete="off">
                    <input ref={target} className="scout-searchbar" type="text" name="searchbar" placeholder={'Search users'} onChange={(e) => searchUser(e.target.value)}/>
                    <Overlay
                        rootClose={true}
                        transition={true}
                        show={searchUserModal}
                        target={target.current}
                        placement={'bottom-start'}
                        container={ref}
                        onHide={()=> closeSearchModal()}
                    >
                        <Popover id="popover-basic">
                            
                        <div className="post-container search-result">
                            {searchResult ? (
                                    <>

                                        <div className="post-text-container search-result">
                                            <NavLink className="profile-link" to={'/profile/' + searchResult?._ownerId} >
                                                <div className="post-text-wrapper search-result">
                                                    <img className="user-avatar" src={searchResult?.avatar ? searchResult.avatar : "/assets/images/default_user_icon.jpg"} alt="User" />
                                                    <h6 className="user-info-body search-result">
                                                        {searchResult?.firstName} {searchResult?.lastName} <br />
                                                        <span className="small-text search-result">@{searchResult?.username}</span>
                                                    </h6>
                                                </div>
                                            </NavLink>
                                            <span onClick={() => deleteSearch()} className="close">&times;</span>
                                        </div>
                                    </>
                            
                            ) : <p style={{color: 'var(--text-color)'}}>No matches yet</p>}
                        </div>
                        </Popover>
                    </Overlay>
                </form>
            </div>
            <div className="tabs-wrapper">
                {categories.map(x => (
                    <button key={x.category} className={'tabs-btn' + (isActive.category === x.category ? ' active' : '')} onClick={() => changeCategoryHandler(x)}>{x.category}</button>
                ))}
            </div>
            {isLoading ? <Spinner />
                : (
                    <div className="news-wrapper">
                        {news.length > 0 ? news.map(x => (
                            <a className="news-link" key={x.url} rel="noreferrer" target="_blank" href={x.url}>
                                <div className="news-card">
                                    <p><i className={isActive.icon}></i> {x.provider[0].name}</p>
                                    <p className="news-description">{x.description}</p>
                                </div>
                            </a>
                        )) : ''}
                    </div>
                )}

        </div>
    )
}