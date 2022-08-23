import './App.css';
import {useState, useEffect} from "react"
import {db, storage} from "./firebase"
import {uid} from "uid"
import {v4} from "uuid"
import {set, ref, onValue} from "firebase/database"
import {uploadBytes, getDownloadURL, ref as sRef} from "firebase/storage"
import List from "./views/List"
import Toast from "./components/Toast"



function App() {
// states
  const [afterUpload, setAfterUpload] = useState(true)
  const [afterComplete, setAfterComplete] = useState(false)
  const [name, setName] = useState("")
  const [adress, setAdress] = useState("")
  const [description, setDescription] = useState("")
  const [imagePath, setImagePath] = useState("")
  const [imageUpload, setImageUpload] = useState(null)
  const [podnety, setPodnety] = useState([])
  const [fileInput, setFileInput] = useState("")

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

//read from db
    useEffect(() => {
      onValue(ref(db, 'podnety/'), (snapshot) => {
        setPodnety([]);
        const data = snapshot.val();
        if (data !== null) {
          Object.values(data).map((podnet) => {
            setPodnety((prev) => [...prev, podnet])
            });
    }})
    }, [])

// Bootstrap toast
const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
  toastTrigger.addEventListener('click', () => {
    const toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
  })
}

  return (
    <div className="App">
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
        <hr />
             {podnety
             .sort((a, b) => 
             new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).reverse()
             .map((podnet) => 
               (<List src={podnet.url}
                key={podnet.ID}
                name={podnet.username}
                address={podnet.address}
                popis={podnet.description}
                date={podnet.date}
                />
      ))
      }
      <Toast id={"liveToast"} />
    </div>
  );
}

export default App;
