import styled, { css } from 'styled-components';
import '../../index.css';
import PropTypes from 'prop-types';
import React from 'react';

import { Link, useHistory } from 'react-router-dom';

import logo from './Feedme.svg';
import lightlogo from './FeedmeLight.svg';

export const Container = styled.div`
  display: flex;
  flex-direction: ${(p) => (p.vertical ? 'column' : 'row')};
  ${(p) => (p.wrap ? 'flex-wrap: wrap' : '')};
  ${(p) => (p.flex ? `flex: ${p.flex}` : '')};
  ${(p) => (p.margin ? `margin: ${p.margin}` : '')};
  ${(p) => (p.gap ? `margin: ${p.gap}` : '')};
  ${(p) => (p.padding ? `padding: ${p.padding}` : '')};
  ${(p) => (p.justifyContent ? `justify-content: ${p.justifyContent}` : '')};
  ${(p) => (p.alignItems ? `align-items: ${p.alignItems}` : '')};
  ${(p) => (p.minHeight ? `min-height: ${p.minHeight}` : '')};
  ${(p) => (p.maxHeight ? `max-height: ${p.maxHeight}` : '')};
  ${(p) => (p.height ? `height: ${p.height}` : '')};
  ${(p) => (p.containerHeight ? `height: ${p.containerHeight}` : '')};
  ${(p) => (p.containerWidth ? `width: ${p.containerWidth}` : '')};
  ${(p) => (p.color ? `background: ${p.color}` : '')};
  ${(p) => (p.width ? `width: ${p.width}` : '')};
  ${(p) => (p.gap ? `gap: ${p.gap}` : '')};
  ${(p) => (p.overflow ? `overflow: ${p.overflow}` : '')};
  ${(p) => (p.display ? `display: ${p.display}` : '')};
`;

const LogoImage = ({ width }) => <img src={logo} width={width} alt="Logo" />;
const LogoImageLight = () => <img src={lightlogo} alt="Logo" />;

const LogoWrapper = styled(Container)`
  align-self: ${(p) => (p.alignSelf ? p.alignSelf : 'start')};
  justify-content: center;
  width: 175px;
  height: ${(p) => (p.logoHeight ? p.logoHeight : '37px')};
`;

export const Logo = ({ alignSelf, className, logoHeight, wide }) => {
  const href = '/';
  const history = useHistory();
  let redirector = () => {
  };
  if (href) {
    redirector = () => {
      history.push(href);
    };
  }
  return (
    <LogoWrapper
      className={`${className} clickable`}
      alignSelf={alignSelf}
      logoHeight={logoHeight}
      onClick={redirector}
    >
      <LogoImage width={wide && '100%'} />
    </LogoWrapper>
  );
};

export const LogoLight = ({ alignSelf, className, logoHeight, LogoWidth }) => (
  <LogoWrapper
    className={className}
    alignSelf={alignSelf}
    logoHeight={logoHeight}
    LogoWidth={LogoWidth}
  >
    <LogoImageLight />
  </LogoWrapper>
);
LogoLight.propTypes = Logo.propTypes;

Logo.propTypes = {
  alignSelf: PropTypes.string,
  className: PropTypes.string,
  logoHeight: PropTypes.string,
  width: PropTypes.string,
};

const LinkWrapper = ({ className, children, id, onClick, to }) => {
  if (to === '') {
    to = () => {
    };
  }
  return (
    <Link
      to={to}
      className={className}
      id={id}
      onClick={
                onClick ||
                ((e) => {
                  e.stopPropagation();
                })
            }
    >
      {children}
    </Link>
  );
};
LinkWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  id: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
};
LinkWrapper.defaultProps = {
  to: '',
};

const ButtonWrapper = ({ className, children, onClick, href, disabled }) => {
  const history = useHistory();
  const redirector = (e) => {
    e.preventDefault();
    history.push(href);
  };
  const clickHandle = (e) => {
    if (onClick) onClick(e);
    if (href) redirector(e);
  };

  return (
    <button className={`${className} clickable`} onClick={clickHandle} disabled={disabled}>
      {children}
    </button>
  );
};
ButtonWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  href: PropTypes.string,
  disabled: PropTypes.bool,
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

export const LinkStyled = styled(LinkWrapper)`
  color: var(--primary-color);
  font-family: var(--nunito-font);
  font-weight: bold;
  text-decoration: none;

  :hover {
    color: var(--styled-gray);
  }
`;
export const ButtonAsLinkStyled = styled.button`
  color: var(--primary-color);
  font-family: var(--nunito-font);
  font-weight: bold;
  font-size: 16px;
  text-decoration: none;
  background-color: #00000000;
  border: none;
  outline: none;

  :hover {
    color: var(--styled-gray);
    cursor: pointer;
  }
`;

export const LabelStyled = styled.label`
  font-size: 16px;
  line-height: 22px;
  color: var(--styled-gray);
`;
const asButtonCss = css`
  width: 100%;
  height: 48px;
  background: var(--primary-color);
  border: 2px solid var(--primary-color);

  :hover {
    cursor: pointer;
    background: var(--pure-white);
  }

  border-radius: 8px;
  ${(p) =>
    p.disabled &&
          css`
            :hover {
              cursor: auto;
            }

            opacity: 0.4;
          `}
  ${(p) =>
    p.secondary &&
          css`
            background: var(--pure-white);
            border-radius: 8px;
            border: 2px solid var(--primary-color);

            :hover {
              background: var(--primary-color);
            }
          `}
  ${(p) =>
    p.thick &&
          css`
            border: 1px solid var(--primary-color);
          `}

  ${(p) =>
    p.medium &&
          css`
            max-width: 220px;
            max-height: 45px;
            font-size: 18px;
          `}
  ${(p) =>
    p.small &&
          css`
            max-width: 120px;
            max-height: 45px;
            font-size: 18px;
          `}
  ${(p) =>
    p.tiny &&
          css`
            max-width: 90px;
            max-height: 40px;
            font-size: 14px;
          `}
  font-family: var(--nunito-font);
  font-style: normal;
  font-weight: 600;
  ${(p) =>
    p.light &&
          css`
            font-weight: 400;
          `}
  font-size: 18px;
  line-height: 27px;
  align-items: center;
  text-align: center;
  color: var(--pure-black);
`;

export const LabelAsButton = styled.label`
  display: flex;
  justify-content: center;
  ${asButtonCss}
`;
export const InputFeedback = styled.div`
  color: red;
  margin-top: 0.25rem;
`;

export const LinkAsButton = styled(LinkWrapper)`
  display: flex;
  justify-content: center;
  outline: none;
  text-decoration: none;
  ${asButtonCss}
`;

export const ButtonStyled = styled(ButtonWrapper)`
  ${asButtonCss}
`;

export const InputStyled = styled.input`
  box-sizing: border-box;
  border-radius: 8px;
  font-size: 26px;
  padding: 3px 8px;
  background: var(--pure-white);
  border: 1px solid var(--styled-gray);
  ${(p) => p.flex && `flex:${p.flex};`}
  ${(p) => p.hide && 'display:none;'}
`;

export const TextInputStyled = styled.textarea`
  box-sizing: border-box;
  border-radius: 8px;
  font-size: 30px;
  padding: 3px 8px;

  background: var(--pure-white);
  border: 1px solid var(--styled-gray);
`;

export const Image = ({ src, alt, width, height, radius }) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{ borderRadius: radius, objectFit: 'cover', objectPosition: 'center center' }}
    />
  );
};
Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  radius: PropTypes.string,
};

export const ImageStyled = styled(Image)``;

export const ParagraphStyled = styled.p`
  ${(p) => (p.color ? `color:${p.color};` : '')}
  ${(p) => (p.size ? `font-size:${p.size};` : '')}
  ${(p) => (p.transform ? `text-transform:${p.transform};` : '')}
`;

export const H1Styled = styled.h1`
  font-weight: bold;
  ${(p) => (p.color ? `color:${p.color};` : '')}
  ${(p) => (p.size ? `font-size:${p.size};` : '')}
  ${(p) => (p.transform ? `text-transform:${p.transform};` : '')}
`;

LogoImage.propTypes = {
  width: PropTypes.string,
};
