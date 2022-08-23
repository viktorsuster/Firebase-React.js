import React, {useState} from 'react'
import {storage} from "../../firebase"
import {uploadBytes, getDownloadURL, ref as sRef} from "firebase/storage"
import {v4} from "uuid"

const UploadImage = (props) => {
  
  const [imageUpload, setImageUpload] = useState(null)
  // upload image to storage
  const uploadImage = () => {
    if (imageUpload == null) return
    const imageRef = sRef(storage, `images/${imageUpload.name + v4()}`)
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImagePath(url)
        setAfterComplete(true)
        setAfterUpload(false)
      })
    })
  }

  const handleImageUpload = (e) => {
    setImageUpload(e.target.files[0])
    }

  return (
    <div className="input-group mb-3">
            <input type="file"
                   disabled={!props.afterUpload}
                   key={props.fileInput}
                   onChange={handleImageUpload}
                   className="form-control"
                   id="inputGroupFile02"
                   />
            <button className="input-group-text"
                   disabled={!props.afterUpload}
                   onClick={uploadImage}
                   >
                    Nahrať
            </button>
       </div>
  )
}

export default UploadImage