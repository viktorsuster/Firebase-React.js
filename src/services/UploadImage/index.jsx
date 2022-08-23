import React, {useState} from 'react'
import {storage} from "../../firebase"
import {uploadBytes, getDownloadURL, ref as sRef} from "firebase/storage"
import {v4} from "uuid"


const UploadImage = (props) => {
// state
    const [imageUpload, setImageUpload] = useState(null)
    const [loadingImage, setLoadingImage] = useState(false)
// upload image to storage
  const uploadImage = () => {
    if (imageUpload == null) return
    setLoadingImage(true)
    const imageRef = sRef(storage, `images/${imageUpload.name + v4()}`)
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setLoadingImage(false)
        props.imageUrl(url)
        props.onAddButton(true)
        props.offUpload(false)
      })
    })
  }
// handler
  const handleImageUpload = (e) => {
    setImageUpload(e.target.files[0])
    }

  return (
    <div className="input-group mb-3">
          <input type="file"
                 disabled={!props.afterUpload}
                 key={props.resetFileInput}
                 onChange={handleImageUpload}
                 className="form-control"
                 id="inputGroupFile02"
                   />
                   {loadingImage ?
                   <button className="btn btn-primary" type="button" disabled>
                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    Loading...
                    </button>
                    :
                    <button className="input-group-text"
                   disabled={!props.afterUpload}
                   onClick={uploadImage}
                   >
                    Upload
                    </button>
                    }
       </div>
  )
}

export default UploadImage