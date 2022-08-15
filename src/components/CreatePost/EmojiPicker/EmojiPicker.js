import './Emoji.css';
import Picker from 'emoji-picker-react';
import { useRef, useState } from 'react';
import { decode } from 'html-entities';
import { Overlay, Popover } from 'react-bootstrap';

export default function EmojiPicker({ contentUpdate }) {
    const [show, setShow] = useState(false);
    const ref = useRef(null);
    const target = useRef(null);

    const onEmojiClick = (event, emojiObject) => {
        contentUpdate(emojiObject.emoji)
    };

    const handleClick = (event) => {
        setShow(!show);
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
                    placement="bottom-start"
                    container={ref}
                    onHide={handleClick}
                >
                    <Popover id="popover-basic">
                            <Picker 
                            onEmojiClick={onEmojiClick}
                            preload={true}
                            searchPlaceholder={decode('&#xf002;')} />
                    </Popover>
                </Overlay>
            </div>
        </>
    );
}