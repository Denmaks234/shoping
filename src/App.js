import logo from './logo.svg';
import './App.css';
import "macro-css"
import axios from 'axios';
import React from 'react';

import Header from './components/Header/Header'
import Drawer from './components/Drawer/Drawer';
import { Routes,Route} from 'react-router-dom';
import { Carousel } from './Carousel/Carousel';
import Home from './pages/Home';
import Favorite from './pages/Favorite';

 export const AppContext=React.createContext({})


function App() {
  const[openCart,setOpenCart]=React.useState(false)
  const [items,setItems]=React.useState([])
  const [cartitems,setCartItems]=React.useState([ ])
  const [searchValue,setSearchValue]=React.useState("")
  const [favorite,setFavorite]=React.useState([ ])

React.useEffect(()=>{
  async function fetchResponse(){
    
    const cartResponse=await axios.get("https://628ccd36a3fd714fd039aab2.mockapi.io/cart")
    const favoriteResponse= await  axios.get("https://628ccd36a3fd714fd039aab2.mockapi.io/favorite")
    const itemsResponse= await axios.get("https://628ccd36a3fd714fd039aab2.mockapi.io/items")

   
   setCartItems(cartResponse.data) 
    setFavorite(favoriteResponse.data)
    setItems(itemsResponse.data)
    
  }
  fetchResponse()

  
  
 


},[])
 function onRemoveItem(id){
     setCartItems(cartitems.filter((item)=>(item.id!=id)))
     axios.delete(`https://628ccd36a3fd714fd039aab2.mockapi.io/cart/${id}`)
 }
async function OnAddCart(obj){
   const findItem=cartitems.find(item=>Number(item.parentId)===Number(obj.id))
  if(findItem){

    setCartItems(cartitems.filter(item=>item.parentId!=obj.parentId))  
    axios.delete(`https://628ccd36a3fd714fd039aab2.mockapi.io/cart/${findItem.id}`)
  }
  else{
    setCartItems([...cartitems,obj])
    const {data}= await axios.post("https://628ccd36a3fd714fd039aab2.mockapi.io/cart",obj)
    setCartItems(prev=>prev.map(item=>{
      if(item.parentId==data.parentId){
        return {
          ...item,
          id:data.id
        }
      }
      else{
        return item
      }
  }))

  }
  
 }




 async function OnAddToFavorite(obj){
if(favorite.find(fav=>(fav.id===obj.id))){
  axios.delete(`https://628ccd36a3fd714fd039aab2.mockapi.io/favorite/${obj.id}`)
  setFavorite(favorite.filter(item=>item.id!=obj.id))
}else{
  const{data}=await axios.post("https://628ccd36a3fd714fd039aab2.mockapi.io/favorite",obj)
setFavorite([...favorite,data])
}
}






function onChangeSearchInput(event){
  setSearchValue(event.target.value)
  
}

function isItemAdded(id){
  return cartitems.some(item=>(item.parentId==id))
}

  return (
    <AppContext.Provider value={ {items, cartitems,favorite ,isItemAdded ,setOpenCart,setCartItems}}>
  
    <div className="wrapper clear">
       
          
       {openCart ? <Drawer items={cartitems} onClose={()=>{setOpenCart(false)}} onRemoveItem={onRemoveItem}/>:null}
          
    <Header onClickCart={()=>{setOpenCart(true)}}/> 
    
             <div className='carousel d-flex align-center justify-center'>
  <div className='carousel__text'>
    <h1 className='mb-50'>The best 
      Forever!</h1>
    <button className='carousel__button'>Купить сейчас</button>
  </div>

 
  <Carousel>
    <div className='item item1 d-flex align-center justify-center'><img src='/img/carousel2.png'></img></div>
    <div className='item item2 d-flex align-center justify-center'><img src='/img/carousel3.png'></img></div>
    <div className='item item3 d-flex align-center justify-center'><img src='/img/carousel5.png'></img></div>
  </Carousel>
</div>
      <Routes>
    <Route path='/' element={ 
    <Home 
    cartitems={cartitems}
    items={items} 
    searchValue={searchValue}
    OnAddToFavorite={OnAddToFavorite}
    OnAddCart={OnAddCart}
    onChangeSearchInput={onChangeSearchInput}
    />}>
    </Route>
   <Route path="/favorite" element={<Favorite OnAddToFavorite={OnAddToFavorite}/>}></Route>
  </Routes> 
      </div>
      </AppContext.Provider>
  );
  }

export default App;


