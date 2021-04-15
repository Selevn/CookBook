import styled from 'styled-components';
import vegetable from './images/juice.jpg';
import Logo from './images/FeedMe.jpg';


export const MainDiv = styled.div`
  position: relative;
  display: grid;
  height: 100%;
  min-height: 100vh;
  grid-template-columns: 40% 60%;
  background: #EEEAEB;  
`;

export const FormDiv = styled.div`
  grid-row: 0;
  grid-column: 1;
  display: grid;
  margin: auto;
  
  padding: 75px;
  
  width: 405px;
  height: 503px;
  
  background: #FFFFFF;
  border-radius: 16px;
  
`;

export const ImageVegetables = styled.div`
  grid-row: 0;
  grid-column: 2;
  
  width: 768px;
  height: 902px;
  margin: auto;
  background: url(${vegetable});
`;

export const ImageLogo = styled.div`
  grid-column: 0;
  width: 180px;
  height: 68px;
  background: url(${Logo}) no-repeat;
`;

