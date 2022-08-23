import React, {useState, useEffect} from "react"
import {db} from "../../firebase"
import {ref, onValue} from "firebase/database"
import Item from "../Item"

const List = () => {
  const [podnety, setPodnety] = useState([])

  //read from db
      useEffect(() => {
        onValue(ref(db, 'podnety/'), (snapshot) => {
          setPodnety([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((podnet) => {
              setPodnety((prev) => [...prev, podnet]
              .sort((a, b) => 
               new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).reverse())
              });
      }})
      }, [])
  return (
    <>
    {podnety
             .map((podnet) => 
               (<Item src={podnet.url}
                key={podnet.ID}
                name={podnet.username}
                address={podnet.address}
                popis={podnet.description}
                date={podnet.date}
                />
      ))
      }
    </>
  )
}

export default List