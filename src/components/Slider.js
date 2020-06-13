import React from "react";
import Slider from "react-slick";
import styled from 'styled-components'
// import sliderimg from '../../public/static/images/'
import img1 from '../../public/static/image1.png'
export default class SimpleSlider extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    console.log(this.props);
    return (
        <>
      <Slider {...settings}>
        <Slide>
            <img src={require("../../public/static/image1.png")}/>
        </Slide>
        <Slide>
        <img src={require("../../public/static/image2.png")}/>        
        </Slide>
        <Slide>
        <img src={require("../../public/static/image3.png")}/>
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