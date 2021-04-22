import React from 'react';
import PropTypes from 'prop-types';
import CoolBook from '../../common/images/cookbook1.jpg';
import {
  Author,
  CookCardContainer,
  CookCardImage,
  Description,
  DescriptionText,
  MinimizedCard,
  MinimizedCardText,
  Name,
} from './style/CookCardComponentStyle';
import { Container } from '../../common/StylesComponent';
import { Views } from '../Views';
import { Commented } from '../Commented';
import { Liked } from '../Liked';

export const CookCardComponent = ({
  views,
  likes,
  comments,
  isLiked,
  isCommented,
  author,
  name,
  desc,
  type,
}) => {
  let width;
  let height;
  let imgHeight;
  let imgWidth;
  let showFooter = true;
  let showDesc = false;
  switch (type) {
    case 'small': {
      width = '225px-(var(--padding-card)*2)';
      height = '360px-(var(--padding-card)*2)';
      imgHeight = '215px';
      imgWidth = '215px';
      break;
    }
    case 'normal': {
      width = 'calc(350px - (var(--padding-card)*2))';
      height = 'calc(455px - (var(--padding-card)*2))';
      imgHeight = '215px';
      imgWidth = '310px';
      showDesc = true;
      break;
    }
    case 'bigImage': {
      width = 'calc(340px-(var(--padding-card)*2))';
      height = 'calc(361px-(var(--padding-card)*2))';
      imgHeight = '236px';
      imgWidth = '310px';
      showFooter = false;
      break;
    }
    case 'long': {
      width = '215px';
      height = '215px';
      break;
    }
    default: {
      break;
    }
  }

  return (
    <CookCardContainer vertical containerWidth={width} containerHeight={height}>
      <Views count={views} />
      <CookCardImage
        src={CoolBook}
        width={imgWidth}
        height={imgHeight}
        alt="CookBook front image"
      />
      <Container vertical>
        <Name>{name}</Name>
        <Author>{author}</Author>
      </Container>
      {showDesc && (
        <>
          <Description maxWidth={width}>
            <DescriptionText>{desc}</DescriptionText>
          </Description>
        </>
      )}
      {showFooter && (
        <Container margin="8px 0 0 0" justifyContent="space-between">
          <Liked count={likes} liked={isLiked} />
          <Commented count={comments} commented={isCommented} />
        </Container>
      )}
    </CookCardContainer>
  );
};

CookCardComponent.propTypes = {
  views: PropTypes.number,
  likes: PropTypes.number,
  comments: PropTypes.number,
  isLiked: PropTypes.bool,
  isCommented: PropTypes.bool,
  author: PropTypes.string,
  name: PropTypes.string,
  desc: PropTypes.string,
  type: PropTypes.string,
};
CookCardComponent.defaultProps = {
  views: 999,
  likes: 400,
  comments: 7,
  isLiked: false,
  isCommented: false,
  author: 'John Doe',
  name: 'Fresh meat',
  desc:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
    'Magna amet etiam risus aliquet sit vel venenatis. Dolor,' +
    'risus sit aliquam pharetra. ',
  type: 'small',
};

export const CookCardMenuComponent = ({ name, type }) => {
  let width;
  let height;
  switch (type) {
    case 'large': {
      width = '540px';
      height = '540px';
      break;
    }
    case 'long': {
      width = '540px';
      height = '255px';
      break;
    }
    case 'small': {
      width = '255px';
      height = '255px';
      break;
    }
    default: {
      width = '255px';
      height = '255px';
      break;
    }
  }
  return (
    <MinimizedCard image={CoolBook} containerHeight={height} containerWidth={width} type={type}>
      <MinimizedCardText type={type}>{name}</MinimizedCardText>
    </MinimizedCard>
  );
};

CookCardMenuComponent.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
};
CookCardMenuComponent.defaultProps = {
  type: 'large',
  name: 'Lorem Ipsum',
};
