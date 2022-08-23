import React, {useState} from 'react'
import {db} from "../../firebase"
import {ref} from "firebase/database"
import {uid} from "uid"
import {set} from "firebase/database"
import UploadImage from "../../services/UploadImage"

const Form = () => {

  // states
  const [afterUpload, setAfterUpload] = useState(true)
  const [afterComplete, setAfterComplete] = useState(false)
  const [name, setName] = useState("")
  const [adress, setAdress] = useState("")
  const [description, setDescription] = useState("")
  const [imagePath, setImagePath] = useState("")
  const [fileInput, setFileInput] = useState("")


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
       <UploadImage />
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