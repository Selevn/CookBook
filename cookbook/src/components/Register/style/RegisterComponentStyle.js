import styled from 'styled-components';
import { Container } from '../../common/StylesComponent';

import vegetables from '../../common/images/RegisterBack.jpg';

export const MainDiv = styled(Container)`
  height: 100%;
  min-height: 100vh;
  justify-content: space-around;
  grid-template-columns: 40% 60%;

  background-image: url(${vegetables}), linear-gradient(#dfeaee, #cbd8de);
  background-repeat: no-repeat;
`;
