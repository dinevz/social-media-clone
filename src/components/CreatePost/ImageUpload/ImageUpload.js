import { useState } from 'react'
import { uploadFileService } from '../../../services/fileUploadService';
import './ImageUpload.css'

export default function ImageUpload () {
    const [file, setFile] = useState();
    
  
    const uploadFileHandler = () => {
        console.log(file);
        uploadFileService(file)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="image-icon">
            <input type="file" onChange={(e) => setFile(e.currentTarget.files[0])}/>
            <i className="fa-solid fa-image" onClick={uploadFileHandler}></i>
        </div>
    )

}