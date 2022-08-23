import React, {useState} from 'react'

const List = (props) => {
  const [isClicked, setIsClicked] = useState(false)
  

  const showMore = () => {
    {isClicked
    ? setIsClicked(false)
    : setIsClicked(true)
  }
      }

  return (
    <div className="list-container">
    <div className="container"
         onClick={showMore}>
          <strong>Meno a priezvisko : {props.name}</strong>
          <p>Adresa : {props.address}</p>
          {isClicked
        ? <>
        <p>Popis: {props.popis}</p>
        <p>{props.date}</p>
        </>
        : null
      }
          <img src={props.src} />
          </div>
          </div>
  )
}

export default List