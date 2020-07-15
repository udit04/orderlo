import React from 'react'
import { VegIcon,NonVegIcon } from '../Icons';


export const IsVeg = (props) =>{
      const {height,width,is_veg,...rest} = props;
      if(props.is_veg)
       return (
         <VegIcon  height={height?height:10} {...rest}/>
       )
      else
       return (
         <NonVegIcon width={width?width:10} {...rest}/>
       )
}