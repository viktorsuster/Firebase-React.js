import React, {useState} from 'react'
import {db} from "../../firebase"
import {ref} from "firebase/database"
import {uid} from "uid"
import {set} from "firebase/database"
import UploadImage from "../../services/UploadImage"



const Form = () => {
    // states
  const [imagePath, setImagePath] = useState("")
  const [fileInput, setFileInput] = useState("")
  const [afterUpload, setAfterUpload] = useState(true)
  const [afterComplete, setAfterComplete] = useState(false)
  const [name, setName] = useState("")
  const [adress, setAdress] = useState("")
  const [description, setDescription] = useState("")


// write to db
function writeUserData() {
  const uuid = uid()
  set(ref(db, 'suggestions/' + `/${uuid}`), {
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
  const setImageUrl = (data) => {
    setImagePath(data)
  }
  const setOffUpload = (e) => {
    setAfterUpload(e)
  }
  const setOnAddButton = (e) => {
    setAfterComplete(e)
  }
  const rstFileInput = (e) => {
    setFileInput(e)
  }

  return (
    <div className="form-control">
        <input 
       type="text"
       placeholder="Full name"
       value={name}
       onChange={handleNameChange}
       required
       />
        <input 
       type="text"
       placeholder="Address"
       value={adress}
       onChange={handleAdressChange}
       required
       />
        <textarea 
       type="text"
       className="form-label"
       placeholder="Description"
       value={description}
       onChange={handleDescriptionChange}
       rows="3"
       required
       />
       <UploadImage resetFileInput={rstFileInput} imageUrl={setImageUrl} offUpload={setOffUpload} onAddButton={setOnAddButton} />
       <div className="d-grid gap-2">
        <button className="btn btn-primary"
                type="button"
                disabled={!afterComplete} 
                onClick={writeUserData}
                id="liveToastBtn"
                >
                  Add suggestion
        </button>
        </div>
        </div>
  )
}

export default Form