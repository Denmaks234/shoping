import {useState,useEffect ,Children, cloneElement} from "react"
import'./Carousel.scss'
import{FaChevronRight}from 'react-icons/fa'
const PAGE_WIDTH=638

export const Carousel = ({children})=>{
     const[pages, setPages]=useState([])
     const[offset,setOffset]=useState(0)
     const handRightArrowClick=()=>{
        setOffset((currentOffset)=>{
            let newOffset=currentOffset-PAGE_WIDTH
           if(newOffset<-1320){
             newOffset=0
           }
            return newOffset
        })
    }
     useEffect(()=>{
        setPages(
            Children.map(children,child=>{
                return cloneElement (child,{
                    style:{
                        height:"100%",
                        
                        minWidth:`${PAGE_WIDTH}`,
                        maxWidth:`${PAGE_WIDTH}px`,
                    }
                })
            })
        )
     },[])


    return(
      
        <div className="main-container"> 
            <div className='window'>
                <div className='all-pages-container' style={{transform:`translateX(${offset}px)`}}>{pages}</div>
                <FaChevronRight className='arrow' onClick={handRightArrowClick}/>
            </div> 
            
        </div>
    )
}