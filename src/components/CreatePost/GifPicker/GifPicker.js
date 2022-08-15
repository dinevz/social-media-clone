import { useEffect, useState } from "react";
import { getTrendingGifs } from "../../../services/gifService";
import { GifIcon } from "./GifIcon";
import './GifPicker.css';
import GifPickerModal from "./GifPickerModal";

export default function GifPicker({mediaUpdate}) {

    const [modalShow, setModalShow] = useState(false);
    const [trendingGifs, setTrendingGifs] = useState([]);
    const [offset, setOffset] = useState(0); 

    useEffect(() => {
        getTrendingGifs(0)
            .then(res => {
                setTrendingGifs(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const hideModal = () => {
        setModalShow(false);
    }

    const loadMore = (offnum) => {
        getTrendingGifs(offnum + 15)
            .then(res => {
                setTrendingGifs(oldData => [...oldData, ...res.data]);
                setOffset(offnum + 15);
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <>
            <div className="gif-icon" onClick={() => setModalShow(old => !old)}>
                <GifIcon />
            </div>

            <GifPickerModal
                show={modalShow}
                hideModal={hideModal}
                trendingGifs={trendingGifs}
                loadMore={loadMore}
                offset={offset}
                mediaUpdate={mediaUpdate}
            />
        </>
    )
}