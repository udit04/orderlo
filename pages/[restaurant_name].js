import React from 'react';
import { RestoLoginService } from '../src/services/restoLoginService';
import Restaurant from './restaurant/[res_id]';

export default function RestaurantName(props) {
  if(!(props.resto && props.resto.restaurant)) return <></>;
  return (
      <Restaurant res_id = {props.resto.restaurant.id} />
  );
}

export const getServerSideProps = async (ctx)=>{
    if(ctx.query.restaurant_name){
        try {
            let resp = await RestoLoginService.getRestoByName({name:ctx.query.restaurant_name});
            return {
                props: {
                    resto : resp.data
                }
            }
        } catch (error) {
            return {
                props: {
                    resto : null
                }
            }
        }
    }
    return {
      props: {
        resto : null
      }
    }
}