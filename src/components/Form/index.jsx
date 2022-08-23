import React, {useState} from 'react'
import {db, storage} from "../../firebase"
import {uploadBytes, getDownloadURL, ref as sRef} from "firebase/storage"
import {ref} from "firebase/database"
import {uid} from "uid"
import {v4} from "uuid"
import {set} from "firebase/database"

const Form = () => {

  // states
  const [afterUpload, setAfterUpload] = useState(true)
  const [afterComplete, setAfterComplete] = useState(false)
  const [name, setName] = useState("")
  const [adress, setAdress] = useState("")
  const [description, setDescription] = useState("")
  const [imagePath, setImagePath] = useState("")
  const [imageUpload, setImageUpload] = useState(null)
  const [fileInput, setFileInput] = useState("")

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

// write to db
function writeUserData() {
  const uuid = uid()
  set(ref(db, 'podnety/' + `/${uuid}`), {
    ID: uuid,
    username: name,
    address: adress,
    description: description,
    date: new Date().toLocaleString(),
    createdAt: new Date().toISOString(),
    url: imagePath,
  })
  setDescription("")
  setAdress("")
  setName("")
  setAfterComplete(false)
  setAfterUpload(true)
  setFileInput(uid)
}

  // handlers
  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handleAdressChange = (e) => {
    setAdress(e.target.value)
  }
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }
  const handleImageUpload = (e) => {
    setImageUpload(e.target.files[0])
    }
  return (
    <div className="form-control">
        <input 
       type="text"
       placeholder="Meno a priezvisko"
       value={name}
       onChange={handleNameChange}
       required
       />
        <input 
       type="text"
       placeholder="Adresa"
       value={adress}
       onChange={handleAdressChange}
       required
       />
        <textarea 
       type="text"
       className="form-label"
       placeholder="Popis podnetu"
       value={description}
       onChange={handleDescriptionChange}
       rows="3"
       required
       />
       <div className="input-group mb-3">
            <input type="file"
                   disabled={!afterUpload}
                   key={fileInput}
                   onChange={handleImageUpload}
                   className="form-control"
                   id="inputGroupFile02"
                   />
            <button className="input-group-text"
                   disabled={!afterUpload}
                   onClick={uploadImage}
                   >
                    Nahrať
            </button>
       </div>
       <div className="d-grid gap-2">
        <button className="btn btn-primary"
                type="button"
                disabled={!afterComplete} 
                onClick={writeUserData}
                id="liveToastBtn"
                >
                  Pridať podnet
        </button>
        </div>
        </div>
  )
}

export default Form