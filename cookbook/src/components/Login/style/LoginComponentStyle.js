import styled from 'styled-components';
import React from "react";
import vegetable from '../../common/images/juice.jpg';
import Logo from '../../common/images/FeedMe.jpg';
import {Container} from "../../common/StylesComponent";

import vegetables from '../../common/images/juice.jpg'

export const MainDiv = styled(Container)`
  height: 100%;
  min-height: 100vh;

  justify-content: space-around;
  grid-template-columns: 40% 60%;
  background: #EEEAEB;  
`;

export const FormDiv = styled(Container)`
  width: ${p=>p.width?p.width:'100%'};
  margin: auto;
  padding: 75px;
  height: 503px;
  background: #FFFFFF;
  border-radius: 16px;

  max-width: 400px;
`;

export const ImageVegetable = () =>(<img src={vegetables} alt={"as"}/>)

export const ImageVegetables = styled(ImageVegetable)`
  
`;

export const ImageLogo = styled.div`
  grid-column: 0;
  width: 180px;
  height: 68px;
  background: url(${Logo}) no-repeat;
`;

