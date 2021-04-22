import React from 'react';
import PropTypes from 'prop-types';
import CoolBook from '../../common/images/cookbook1.jpg';
import {
  Author,
  CookCardContainer,
  CookCardImage,
  MinimizedCard,
  MinimizedCardText,
  Name,
} from './style/CookCardComponentStyle';
import { Container } from '../../common/StylesComponent';
import { Views } from '../Views';
import { Commented } from '../Commented';
import { Liked } from '../Liked';

const calculateSizes = (type) => {
  const answer = {};
  switch (type) {
    case 'small': {
      answer.width = '225px-(var(--padding-card)*2)';
      answer.height = '360px-(var(--padding-card)*2)';
      answer.imgHeight = '215px';
      answer.imgWidth = '215px';
      break;
    }
    case 'normal': {
      answer.width = '310px';
      answer.height = '395px';
      break;
    }
    case 'bigImage': {
      answer.width = 'calc(340px-(var(--padding-card)*2))';
      answer.height = 'calc(361px-(var(--padding-card)*2))';
      answer.imgHeight = '236px';
      answer.imgWidth = '310px';
      answer.showFooter = false;
      break;
    }
    case 'long': {
      answer.width = '215px';
      answer.height = '215px';
      break;
    }
    default: {
      break;
    }
  }
  return answer;
};

export const CookCardComponent = ({
  views,
  likes,
  comments,
  isLiked,
  isCommented,
  author,
  name,
  type,
}) => {
  const { width, height, imgHeight, imgWidth, showFooter } = calculateSizes(type);

  return (
    <CookCardContainer vertical width={width} height={height}>
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
  type: 'small',
};

const calculateImageSizes = (type) => {
  const answer = {};
  switch (type) {
    case 'large': {
      answer.width = '540px';
      answer.height = '540px';
      break;
    }
    case 'long': {
      answer.width = '540px';
      answer.height = '255px';
      break;
    }
    case 'small': {
      answer.width = '255px';
      answer.height = '255px';
      break;
    }
    default: {
      answer.width = '255px';
      answer.height = '255px';
      break;
    }
  }
  return answer;
};

export const CookCardMenuComponent = ({ name, type }) => {
  const { width, height } = calculateImageSizes(type);

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
