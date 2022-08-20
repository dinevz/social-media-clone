import './Emoji.css';
import Picker from 'emoji-picker-react';
import { useRef } from 'react';
import { decode } from 'html-entities';
import { Overlay, Popover } from 'react-bootstrap';

export default function EmojiPicker({ contentUpdate , handleClick, show}) {
    
    const ref = useRef(null);
    const target = useRef(null);
    const onEmojiClick = (event, emojiObject) => {
        contentUpdate(emojiObject.emoji)
    };


    return (
        <>
            <div ref={ref}>
                
                <i ref={target} onClick={handleClick} className="fa-regular fa-face-smile emoji-icon"></i>
                <Overlay
                    rootClose={true}
                    transition={true}
                    show={show}
                    target={target.current}
                    placement={'auto-end'}
                    container={ref}
                    onHide={handleClick}
                    flip={true}
                >
                    <Popover id="popover-basic">
                            <Picker 
                            onEmojiClick={onEmojiClick}
                            preload={true}
                            groupVisibility={{
                                recently_used: false,
                              }}
                            native={false}
                            searchPlaceholder={decode('&#xf002;')} />
                    </Popover>
                </Overlay>
            </div>
        </>
    );
}