import styled from 'styled-components';
import '../../index.css';
import PropTypes from 'prop-types';
import React from 'react';

import logo from './images/FeedMe.jpg';

const LogoImage = () => <img src={logo} alt="Logo" />;

const LogoWrapper = styled.div`
  align-self: ${(p) => (p.alignSelf ? p.alignSelf : 'start')};
  justify-content: center;
  width: 175px;
  height: 37px;
`;

export const Logo = () => (
  <LogoWrapper alignSelf="center">
    <LogoImage />
  </LogoWrapper>
);

const LinkWrapper = ({ className, children }) => (
  <a className={className} href="*">
    {children}
  </a>
);
LinkWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const ButtonWrapper = ({ className, children }) => (
  <button className={className}>{children}</button>
);
ButtonWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
const InputWrapper = ({ className, type, onChange, value }) => (
  <input className={className} type={type} onChange={onChange} value={value} />
);
InputWrapper.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
const LabelWrapper = ({ className, children }) => <label className={className}>{children}</label>;
LabelWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export const LinkStyled = styled(LinkWrapper)`
  color: var(--primary-color);
  font-family: var(--nunito-font);
  font-weight: bold;
  text-decoration: none;
`;

export const LabelStyled = styled(LabelWrapper)`
  font-size: 16px;
  line-height: 22px;
  color: var(--styled-gray);
`;

export const ButtonStyled = styled(ButtonWrapper)`
  width: 100%;
  height: 48px;

  background: var(--primary-color);
  border-radius: 8px;

  font-family: var(--nunito-font);
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;

  align-items: center;
  text-align: center;

  border: none;

  color: var(--pure-black);
`;

export const InputStyled = styled(InputWrapper)`
  border: 1px solid var(--styled-gray);
  box-sizing: border-box;
  border-radius: 8px;
  font-size: 30px;
  padding: 5px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: ${(p) => (p.vertical ? 'column' : 'row')};
  ${(p) => (p.flex ? `flex: ${p.flex}` : '')};
  ${(p) => (p.margin ? `margin: ${p.margin}` : '')};
  ${(p) => (p.padding ? `padding: ${p.padding}` : '')};
  ${(p) => (p.justifyContent ? `justify-content: ${p.justifyContent}` : '')};
  ${(p) => (p.alignItems ? `align-items: ${p.alignItems}` : '')};
  ${(p) => (p.minHeight ? `min-height: ${p.minHeight}` : '')};
  ${(p) => (p.height ? `height: ${p.height}` : '')};
`;

export const TestContainer = styled.div`
  display: flex;
  flex-direction: ${(p) => (p.vertical ? 'column' : 'row')};
  ${(p) => (p.flex ? `flex: ${p.flex}` : '')};
  ${(p) => (p.margin ? `margin: ${p.margin}` : '')};
  ${(p) => (p.padding ? `padding: ${p.padding}` : '')};
  ${(p) => (p.justifyContent ? `justify-content: ${p.justifyContent}` : '')};
  ${(p) => (p.minHeight ? `min-height: ${p.minHeight}` : '')};
  ${(p) => (p.height ? `height: ${p.height}` : '')};
  ${(p) => (p.color ? `background: ${p.color}` : '')};
  width: 100%;
  height: 100%;
`;
