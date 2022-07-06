import React from 'react'
import {AppContext} from "../App"

const Info=({ image,title,description, }) => {
    const {setOpenCart} = React.useContext(AppContext)
  return (
      
    <div>
        <div className='box'>
          <img src={image}/>
          <h3>{title}</h3>
          <p>{description}</p>
          <div className='Total'>
          <button  onClick={()=>setOpenCart()}className='totalBtn'>
 Повернутися
  <img  className="unto"src='/img/anto.png'/>
  </button>
          </div> </div>
    </div>
  )
}
export default Info