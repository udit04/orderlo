import React from 'react'
import { SearchIcon ,CloseIcon} from '../Icons'
import styled  from 'styled-components';
export default function ProductSearch(props) {
    return (
            <SearchWrapper>
                <SearchInput onChange={props.onChange} value={props.value} placeholder={props.placeholder?props.placeholder:"Search Restaurant, Cuisine"}/>
                {props.value!==''?<CloseIcon onClick={props.clearSearch} height={20} width={20}/>:<SearchIcon height={20} width={20}/>}
            </SearchWrapper>
    )
}

const SearchWrapper = styled.div`
    flex:1;
    position:relative;
    svg{
        position: absolute;
        top: 22px;
        right: 10px;
        z-index: 100;
    }
`;
const SearchInput = styled.input`
    width:100%;
    border-radius:8px;
    padding:1rem;
    margin:0.5rem 0;
    color:#fff;
    background: #6d82dc;
    border:none;
    outline:none;
    font-size:1rem;
    /* font-weight:bold; */
    &::placeholder{
        color:#ffffff;
    }
`