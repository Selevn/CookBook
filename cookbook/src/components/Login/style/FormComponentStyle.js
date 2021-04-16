import styled from 'styled-components';
import {StyledLink} from "../../common/StylesComponent";
import logo from '../../common/images/FeedMe.jpg'

const LogoImage = ()=>(<div><img src={logo}/></div>)

export const Logo = styled(LogoImage)`
  width: 100px;
  height: 30px;
`



