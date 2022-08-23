import React, {useState, useEffect} from "react"
import {db} from "../../firebase"
import {ref, onValue} from "firebase/database"
import Item from "../Item"

const List = () => {
  const [suggestions, setSuggestions] = useState([])

  //read from db
      useEffect(() => {
        onValue(ref(db, 'suggestions/'), (snapshot) => {
          setSuggestions([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((suggestion) => {
              setSuggestions((prev) => [...prev, suggestion]
              .sort((a, b) => 
               new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).reverse())
              });
      }})
      }, [])
  return (
    <>
    {suggestions
             .map((suggestion) => 
               (<Item src={suggestion.url}
                key={suggestion.ID}
                name={suggestion.username}
                address={suggestion.address}
                description={suggestion.description}
                date={suggestion.date}
                />
      ))
      }
    </>
  )
}

export default List