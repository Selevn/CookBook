import styled from 'styled-components';
import '../../index.css'

const LinkWrapper = ({ className, children }) => (
    <a className={className} href={"*"}>
        {children}
    </a>
);
const ButtonWrapper = ({ className, children }) => (
    <button className={className}>
        {children}
    </button>
);
const InputWrapper = ({ className, children, type, onChange, value }) => (
    <input className={className} type={type} onChange={onChange} value={value}>
        {children}
    </input>
);
const LabelWrapper = ({ className, children }) => (
    <label className={className}>
        {children}
    </label>
);


export const LinkStyled = styled(LinkWrapper)`
  color: #F7B602;
  font-family: Nunito, sans-serif;
  font-weight: bold;
`;

export const LabelStyled = styled(LabelWrapper)`
  font-family: Nunito, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #7B7B80;
`;


export const ButtonStyled = styled(ButtonWrapper)`
  width: 100%;
  height: 48px;

  background: #F7B602;
  border-radius: 8px;

  font-family: Nunito, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  
  align-items: center;
  text-align: center;

  border: none;
  
  color: #000000;
`;

export const InputStyled = styled(InputWrapper)`
  border: 1px solid #7B7B80;
  box-sizing: border-box;
  border-radius: 8px;
  font-size: 30px;
  padding: 5px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: ${p=>p.vertical ? 'column' : 'row'};
  ${p=>p.flex?`flex: ${p.flex}`:''};
  ${p=>p.margin?`margin: ${p.margin}`:''};
  ${p=>p.padding?`padding: ${p.padding}`:''};
  ${p=>p.justifyContent?`justify-content: ${p.justifyContent}`:''};
  ${p=>p.minHeight?`min-height: ${p.minHeight}`:''};
`;



