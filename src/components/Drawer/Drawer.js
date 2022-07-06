import React from "react"

import Info from "../Info"
import  "./Drawer.scss"
import {AppContext} from "../../App"


const Drawer=(props)=>{
   const {cartitems}=React.useContext(AppContext)
   let totalPrice=cartitems.reduce((sum,obj)=>obj.price+sum,0)
   let totalPrice5=totalPrice*5/100
   const [isComplete,setIsComplete]=React.useState(false)
   const {setCartItems}=React.useContext(AppContext)
   const isCompleteOrder=()=>{
      setIsComplete(true)
      setCartItems([])
   }

    return(
    <div className='overlay'>
    <div className='drawer d-flex flex-column justify-between'> 
    <div className='items'>
      
    <div className='title d-flex justify-between align-center'> 
          <h2>Корзина</h2>
          <svg  onClick={props.onClose}width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" >
<rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#DBDBDB"/>
<path d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z" fill="#B5B5B5"/>
</svg>
         </div>
      {props.items.length===0?
      <Info title={isComplete?"Заказ оформлен!":"Корзина пустая"}
       description={isComplete?"Ваш заказ #18 скоро будет передан курьерской доставке ":"Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
      
      image={ isComplete?"/img/complete.png":"/img/box.png"}/>
      
     
          :props.items.map((obj)=>(
<div className="itemcart d-flex justify-between mb-20">
   <img  heigth={70} width={90}src={obj.imageUrl}/>
   <div className="description ">
      <p>{obj.name}</p>
      <b>{obj.price} грн</b>
   </div>
   <img  heigth={32} width={32}src="/img/close.svg" onClick={()=>props.onRemoveItem(obj.id)}/>
</div>))
}
        
 


{props.items.length>0 ? <ul className='Total'>
  <li className='d-flex'>
   <span >До сплати  </span>
   <div className='dots'>   ..........................................</div>
   <b>{totalPrice} грн</b>
  </li>
  <li className='d-flex'>
  <span>Налог 5%  </span>
   <div className='dots'>    ................................................</div>
   <b className='price'>{totalPrice5} грн</b>
  </li>
  <button  onClick={()=>isCompleteOrder()} className='totalBtn'>
  Оформить заказ
  <img className="arow" src='/img/arow.svg'/>
  </button>
</ul>:null}

   
   

</div>  
   </div>
   </div>
   )


}
export default Drawer