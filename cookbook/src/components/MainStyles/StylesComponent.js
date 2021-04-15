import styled from 'styled-components';
import '../../index.css'

const LinkWrapper = ({ className, children }) => (
    <a className={className}>
        {children}
    </a>
);
const ButtonWrapper = ({ className, children }) => (
    <button className={className}>
        {children}
    </button>
);


export const StyledLink = styled(LinkWrapper)`
  color: #F7B602;
  font-family: Nunito;
  font-weight: bold;
`;

export const StyledButton = styled(ButtonWrapper)`
  width: 415px;
  height: 48px;

  background: #F7B602;
  border-radius: 8px;

  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  
  align-items: center;
  text-align: center;

  color: #000000;
`;



