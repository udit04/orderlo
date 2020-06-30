import React from 'react'
import { VegIcon,NonVegIcon } from '../Icons';


export const IsVeg = (props) =>{
      const {height,width} = props;
      if(props.is_veg)
       return (
         <VegIcon height={height?height:10}/>
       )
      else
       return (
         <NonVegIcon width={width?width:10}/>
       )
}