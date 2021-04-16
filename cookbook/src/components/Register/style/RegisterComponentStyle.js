import styled from 'styled-components';
import React from "react";
import logo from '../../common/images/FeedMe.jpg';
import {Container} from "../../common/StylesComponent";

import vegetables from '../../common/images/RegisterBack.jpg'

export const MainDiv = styled(Container)`
  height: 100%;
  min-height: 100vh;
  justify-content: space-around;
  grid-template-columns: 40% 60%;
  
  background-image: url(${vegetables}), linear-gradient(#dfeaee, #cbd8de);
  background-repeat: no-repeat;  
`;

export const FormDiv = styled(Container)`
  width: ${p=>p.width?p.width:'100%'};
  margin: auto;
  height: 503px;
  max-width: 400px;
  background: #FFFFFF;
  border-radius: 16px;
  @media (max-width: 425px) {
    padding: 10px;
  }
  @media (min-width: 425px) {
    padding: 75px;
  }


`;

export const ImageVegetable = () =>(
        <img src={vegetables} alt={"as"}/>
    )

export const ImageVegetablesContainer = styled(Container)`
  @media (max-width: 1300px) {
    display: none;
  }
`;



export const ImageLogo = styled.div`
  grid-column: 0;
  width: 180px;
  height: 68px;
  background: url(${logo}) no-repeat;
`;

