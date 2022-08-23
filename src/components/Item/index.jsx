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
          <p><strong>Name : {props.name}</strong></p>
          <p><strong>Addres : {props.address}</strong></p>
          {isClicked
        ? <>
        <p>Description: {props.description}</p>
        <p className='dateText'>{props.date}</p>
        </>
        : null
      }
          <img src={props.src} />
          </div>
          </div>
  )
}

export default List