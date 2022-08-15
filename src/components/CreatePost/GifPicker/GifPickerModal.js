import React from 'react';
import { decode } from 'html-entities';

export default function MydModalWithGrid({
    show, hideModal, trendingGifs, loadMore, offset, mediaUpdate}) {
    

    const chooseGifHandler = (e) => {
        hideModal();
        mediaUpdate(e.target.src)

    }
    return (
    <div className="modal" style={{
        display: show ? 'block' : 'none',
    }}>
        
        <div className="modal-content">
            <div className="modal-header">
                
            <span onClick={hideModal} className="close">&times;</span>
            <form method="POST">
                <input className="searchbar" type="text" name="searchbar" placeholder={decode('&#xf002;') + 'Search gifs'}/>
            </form>
            </div>
            <p style={{color: 'var(--text-color)', marginBottom: '10px', marginTop: '10px'}}>Trending</p>
            <div className="modal-gifs">
                {trendingGifs.map(gif => 
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