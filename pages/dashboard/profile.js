import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import { SolidButton, TextInputWrapper, TextInput } from '../../src/components/Login/LoginStyled'
import StyledModal from '../../src/components/Modal/StyledModal'
import Router from 'next/router';
import menuService from '../../src/services/menuService'
import { getHyphenSeperatedStringLowerCase } from '../../src/helpers/util';
import dynamic from 'next/dynamic';
const QRCode = dynamic(import('react-qr-code' /* webpackChunkName: "qrscanner" */), { ssr: false });

function Category() {
    const modalRef = React.createRef();
    const restoModalRef = React.createRef();
    const [restoModal, setRestoModal] = useState(false)
    const [modal, setModal] = useState(false)
    const [restoDetail,setRestoDetail] = useState(null);
    const [origRestoDetail,setOrigRestoDetail] = useState(null);

    useEffect(() => {
        const restoDetail = JSON.parse(localStorage.getItem('restoDetail'));
        if(restoDetail){
            setRestoDetail(restoDetail.restaurant);
            setOrigRestoDetail(restoDetail.restaurant);
        }else{
            Router.push('/restologin')
        }
    }, [])
    const onCloseModal = ()=>{
        setRestoModal(false);
        setRestoDetail(origRestoDetail);
    }

    const handleChange=(key,value)=>{
        let det = {...restoDetail,[key]:value};
        setRestoDetail(det);
    }

    const saveDetails = ()=>{
        menuService.editRestaurant(restoDetail).then(res=>{
            setRestoModal(false);
            localStorage.setItem('restoDetail',JSON.stringify({ restaurant:{...restoDetail}}));
        }).catch(err=>{
            setRestoModal(false);
            setRestoDetail(origRestoDetail);
        })
    }
    return (
        <CategoryWrapper>
            <CategoryList >
            <div style={{textAlign:'right',margin:'10px'}}>
                <DashboadBtn as='button' onClick={()=>Router.push(`/dashboard/${restoDetail.id}`)} style={{background: 'cadetblue',borderRadius: "10px",padding: "10px"}}>Back To Dashboard</DashboadBtn>
                <DashboadBtn as='button' onClick={()=>Router.push(`/menu/products`)} style={{background: 'cadetblue',borderRadius: "10px",padding: "10px", marginLeft:'10px'}}>View All Products</DashboadBtn>
            </div>
            {restoDetail ? <Flex column alignCenter>
                <Flex>
                <SolidButton onClick={()=>setModal(true)} style={{fontSize: '0.9rem',whiteSpace:'nowrap',margin:'0 1rem'}}>Generate QR Code</SolidButton>
                <SolidButton onClick={()=>setRestoModal(true)} style={{fontSize: '0.9rem',whiteSpace:'nowrap',margin:'0 1rem'}}>Edit Details</SolidButton>
                </Flex>
                <CategoryComp style={{maxWidth: '700px',fontSize: '1.2rem'}}> 
                    <Flex justifyBetween alignCenter>
                        Restaurant Name 
                        <Flex className='textvalues'>
                            {restoDetail.name}
                        </Flex>
                    </Flex>
                </CategoryComp>
                <CategoryComp style={{maxWidth: '700px',fontSize: '1.2rem'}}> 
                    <Flex justifyBetween alignCenter>
                        Address 
                        <Flex className='textvalues'>
                            {restoDetail.address}
                        </Flex>
                    </Flex>
                </CategoryComp>
                <CategoryComp style={{maxWidth: '700px',fontSize: '1.2rem'}}> 
                    <Flex justifyBetween alignCenter>
                        Status 
                        <Flex className='textvalues'>
                            {restoDetail.is_active ? 'Opened': 'Closed'}
                        </Flex>
                    </Flex>
                </CategoryComp>
                <CategoryComp style={{maxWidth: '700px',fontSize: '1.2rem'}}> 
                    <Flex justifyBetween alignCenter>
                        Gst No. 
                        <Flex className='textvalues'>
                            {restoDetail.gstno ? restoDetail.gstno: '-'}
                        </Flex>
                    </Flex>
                </CategoryComp>
                <CategoryComp style={{maxWidth: '700px',fontSize: '1.2rem'}}> 
                    <Flex justifyBetween alignCenter>
                        Email
                        <Flex className='textvalues'>
                            {restoDetail.email ? restoDetail.email: '-'}
                        </Flex>
                    </Flex>
                </CategoryComp>
                <CategoryComp style={{maxWidth: '700px',fontSize: '1.2rem'}}> 
                    <Flex justifyBetween alignCenter>
                        GST (%)
                        <Flex className='textvalues'>
                            {restoDetail.gst_tax}
                        </Flex>
                    </Flex>
                </CategoryComp>
                <CategoryComp style={{maxWidth: '700px',fontSize: '1.2rem'}}> 
                    <Flex justifyBetween alignCenter>
                        Vat Tax (%)
                        <Flex className='textvalues'>
                            {restoDetail.vat_tax}
                        </Flex>
                    </Flex>
                </CategoryComp>
                <CategoryComp style={{maxWidth: '700px',fontSize: '1.2rem'}}> 
                    <Flex justifyBetween alignCenter>
                        Service Charge (%)
                        <Flex className='textvalues'>
                            {restoDetail.service_charge}
                        </Flex>
                    </Flex>
                </CategoryComp>
            </Flex> : null}
            </CategoryList>
            {modal &&
                <StyledModal contentRef={modalRef} onClose={()=>setModal(false)}>
                    <ModalContent ref={modalRef} style={{width:'auto'}}>
                        <QRCode value={`https://ordrlo.com/${getHyphenSeperatedStringLowerCase(restoDetail.name)}`} size={400} />
                    </ModalContent>
                </StyledModal>
            }
            {   restoModal &&
                <StyledModal contentRef={restoModalRef} onClose={onCloseModal}>
                    <ModalContent ref={restoModalRef} style={{height:'800px', overflowY:'scroll'}}>
                        <h3 style={{textAlign:'center'}}>Edit Restaurant Details</h3>
                        <TextInputWrapper >
                            <div><b>Name</b></div>
                            <TextInput placeholder='Name' value={restoDetail.name} onChange={(e)=>handleChange('name',e.target.value)}></TextInput>
                        </TextInputWrapper>
                        <TextInputWrapper>
                            <div><b>Address</b></div>
                            <TextInput placeholder='Address' value={restoDetail.address} onChange={(e)=>handleChange('address',e.target.value)} ></TextInput>
                        </TextInputWrapper>
                        <TextInputWrapper>
                            <div><b>Email</b></div>
                            <TextInput placeholder='Email' value={restoDetail.email} onChange={(e)=>handleChange('email',e.target.value)} ></TextInput>
                        </TextInputWrapper>
                        <TextInputWrapper>
                            <div><b>GST No.</b></div>
                            <TextInput placeholder='GST No.' value={restoDetail.gstno ? restoDetail.gstno : ''} onChange={(e)=>handleChange('gstno',e.target.value)} ></TextInput>
                        </TextInputWrapper>
                        <TextInputWrapper>
                            <div><b>Service Charge (%)</b></div>
                            <TextInput type='number' min='0' placeholder='Service Charge' value={restoDetail.service_charge ? restoDetail.service_charge : ''} onChange={(e)=>handleChange('service_charge',Number(e.target.value))} ></TextInput>
                        </TextInputWrapper>
                        <TextInputWrapper>
                            <div><b>Vat Tax (%)</b></div>
                            <TextInput placeholder='Vat Tax' type='number' min='0' value={restoDetail.vat_tax ? restoDetail.vat_tax : ''} onChange={(e)=>handleChange('vat_tax',Number(e.target.value))} ></TextInput>
                        </TextInputWrapper>
                        <TextInputWrapper>
                            <label htmlFor="alchoholic"><input id='alchoholic' type='checkbox' defaultChecked={restoDetail.is_active} name='alchoholic' value='Opened' onChange={(e)=>handleChange('is_active',!restoDetail.is_active)}/>Opened</label>
                        </TextInputWrapper>
                        <TextInputWrapper>
                            <SolidButton onClick={saveDetails}> Save</SolidButton>
                        </TextInputWrapper>
                    </ModalContent>
                </StyledModal>
            }
        </CategoryWrapper>
    )
}

const CategoryWrapper = styled.div`
    background:#f5f5f5;
    min-height:100vh;
    .textvalues{
        color:slategray;
    }
`;
const CategoryList = styled.div`
    max-width: 800px;
    margin: auto;
    padding: 2rem 0;
    background: #fff;
`
const ModalContent = styled.div`
    background: #fff;
    border-radius:20px;
    padding:2rem;
    height:auto;
    overflow:scroll;
    width:100%;
    max-width:600px;
`
const CategoryComp = styled.div`
    padding:1rem;
    width:100%;
    display:block;
    border-bottom:1px solid #c5c5c5;
`;

export const DashboadBtn = styled.div`
    background: lightseagreen;
    border-radius: 10px;
    padding: 10px;
    margin-left: 10px;
    border: none;
    color: #fff;
    font-weight: 800;
    padding: 10px 1rem;
    cursor:pointer;
    &:active,&:hover{
        outline:none;
    }
`
export default Category