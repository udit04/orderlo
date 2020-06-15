import React from "react";
import Slider from "react-slick";
import styled from 'styled-components'
export default class SimpleSlider extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:true
    };
    return (
        <>
      <Slider {...settings}>
        <Slide>
            <img src={require("../../public/static/image_11.jpg")}/>
        </Slide>
        <Slide>
        <img src={require("../../public/static/image_2.jpg")}/>        
        </Slide>
        <Slide>
        <img src={require("../../public/static/image_3.jpg")}/>
        </Slide>
      </Slider>
      </>
    );
  }
}

const Slide = styled.div`
display:block;
width:100%;
min-height:400px;
background:#3c4dae;
img{
    display:block;
    width:100%;
    height:100%;
}
`;