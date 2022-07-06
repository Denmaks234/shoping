import React from "react"
import {AppContext} from "../../App"
import { useContext } from "react"

import styles from  "./Card.module.scss"
const Card=(props)=>{
  const {isItemAdded}=useContext(AppContext)

 
   const onClickPlus=()=>{
     props.onPlus(props.obj)
   
   }

    
    const [like,setLike]=React.useState(props.favorited)
    const onClickLike=()=>{
      props.onFavorite(props.obj)
      setLike(!like)
     }
    return(
    <div className={styles.card}>
<div className={styles.favorite} onClick={props.onFavorite}>
    <img onClick={onClickLike}src={like?'/img/like.svg':'/img/unlike.svg'}/>
</div>

<img width={133} height={112} className={styles.game}src={props.imageUrl}/>
<p> {props.title}</p>
<div className=' d-flex justify-between align-center'>
  <div className={styles.cardPrice}>
    <span>Цінa:</span>
    <br></br>
    <b>{props.price}грн</b>
  </div>

    <img   onClick={onClickPlus} width={32} height={32}src={isItemAdded(props.obj.id)?'/img/add.svg':'/img/plus.svg'}/>

</div>
</div>)
}

export default Card
