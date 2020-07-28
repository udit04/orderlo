import React from 'react';
import { RestoLoginService } from '../src/services/restoLoginService';
import Restaurant from './restaurant/[res_id]';
import styled from 'styled-components'
import {notFoundImg} from '../src/helpers/constants';

export default function RestaurantName(props) {
  if(!(props.resto && props.resto.restaurant)) return <Resto ><img src={notFoundImg} /></Resto>;
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

const Resto = styled.div`
    .not-found {
        top: 50%;
        left: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
    }
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    img {
        width: 300px;
    }
`