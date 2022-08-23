import React from 'react'

const Form = () => {
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