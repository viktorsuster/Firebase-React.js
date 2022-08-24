/* eslint-disable no-useless-concat */
import React, {useState} from 'react'
import {db} from "../../firebase"
import {ref} from "firebase/database"
import {uid} from "uid"
import {set} from "firebase/database"
import UploadImage from "../../services/UploadImage"
import Toast from "../Toast"



const Form = () => {
    // states
  const [afterUpload, setAfterUpload] = useState(true)
  const [imagePath, setImagePath] = useState("")
  const [fileInput, setFileInput] = useState("")
  const [afterComplete, setAfterComplete] = useState(false)
  const [name, setName] = useState("")
  const [adress, setAdress] = useState("")
  const [description, setDescription] = useState("")
  const [inputAlert, setInputAlert] = useState(false)


// write to db
function writeUserData() {
  if (!name || !adress || !description) {
    setInputAlert(true)
    return
  }
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
  setInputAlert(false)
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
       <UploadImage resetFileInput={fileInput}
                    imageUrl={setImagePath}
                    offUpload={setAfterUpload}
                    afterUpload={afterUpload}
                    onAddButton={setAfterComplete}
                     />
       <div className="d-grid gap-2">
        <button className="btn btn-primary"
                type="button"
                disabled={!afterComplete} 
                onClick={writeUserData}
                // id="liveToastBtn"
                >
                  Add suggestion
        </button>
        {inputAlert ?
        <p className='inputError'>All fields are required!</p>
      : null}
        </div>
        <Toast main={"Výborne!"} second={"Podnet bol pridaný."}/>
        </div>
  )
}

export default Form