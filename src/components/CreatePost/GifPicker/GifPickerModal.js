import React from 'react';
import { decode } from 'html-entities';
import { searchGif } from '../../../services/gifService';

export default function MydModalWithGrid({
    show, hideModal, gifs, loadMore, offset, mediaUpdate, updateGifs}) {
    

    const chooseGifHandler = (e) => {
        hideModal();
        mediaUpdate(e.target.src)

    }

    const searchGifHandler = (e) => {
        e.preventDefault();
        if(e.target.searchbar.value === '') {
            return
        }
        searchGif(e.target.searchbar.value)
        .then(res => {
            updateGifs(res.data);
        })
    }

    return (
    <div className="gif-modal" style={{
        display: show ? 'block' : 'none',
    }}>
        
        <div className="gif-modal-content">
            <div className="gif-modal-header">
                
            <span onClick={hideModal} className="close">&times;</span>
            <form method="POST" onSubmit={(e) => searchGifHandler(e)}>
                <input className="gif-searchbar" type="text" name="searchbar" placeholder={'Search gifs'}/>
                <button  type="submit" className="gif-search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
            </div>
            <p style={{color: 'var(--text-color)', marginBottom: '10px', marginTop: '10px'}}>Trending</p>
            <div className="modal-gifs">
                {gifs.map(gif => 
                    <img 
                    alt="Gif" 
                    key={gif.id} 
                    src={gif?.images.original.url}
                    onClick={(e) => chooseGifHandler(e)}
                    >
                    </img>
                    )}  
            </div>
            <button onClick={() =>  loadMore(offset)} type="button" className="gif-load-more">Load more</button>  
        </div>
    </div>

    );
}