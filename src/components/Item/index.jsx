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
          <strong>Name : {props.name}</strong>
          <p>Addres : {props.address}</p>
          {isClicked
        ? <>
        <p>Description: {props.description}</p>
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