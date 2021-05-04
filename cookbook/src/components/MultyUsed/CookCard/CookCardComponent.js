import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
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
  likesIds: likes,
  comments,
  isLiked,
  isCommented,
  author,
  name,
  desc,
  type,
  image,
  _id: id,
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
      desc = `${desc.slice(0, desc.indexOf(' ', 150))}...`;
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
      imgHeight = '236px';
      imgWidth = '310px';
      break;
    }
    default: {
      imgHeight = '236px';
      imgWidth = '310px';
      break;
    }
  }

  const history = useHistory();
  return (
    <CookCardContainer
      onClick={() => {
        history.push(`/info/cookbook/${id}`);
      }}
      className="hoverer"
      vertical
      containerWidth={width}
      containerHeight={height}
    >
      <Views count={views} />
      <CookCardImage
        src={`${image}`}
        width={imgWidth}
        height={imgHeight}
        alt="CookBook front image"
      />
      <Container vertical>
        <Name>{name}</Name>
        <Author>{`${author[0].name.first} ${author[0].name.last}`}</Author>
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
          <Liked count={likes.length || 0} liked={isLiked} />
          <Commented count={comments.length || 0} commented={isCommented} />
        </Container>
      )}
    </CookCardContainer>
  );
};

CookCardComponent.propTypes = {
  views: PropTypes.number,
  likes: PropTypes.array || PropTypes.number,
  likesIds: PropTypes.array,
  comments: PropTypes.array,
  isLiked: PropTypes.bool,
  isCommented: PropTypes.bool,
  author: PropTypes.array,
  name: PropTypes.string,
  desc: PropTypes.string,
  type: PropTypes.string,
  image: PropTypes.string,
  _id: PropTypes.number,
};

export const CookCardMenuComponent = ({ name, type, image, _id: id }) => {
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

  const history = useHistory();
  return (
    <MinimizedCard
      className="hoverer"
      image={image}
      containerHeight={height}
      containerWidth={width}
      type={type}
      onClick={(e) => {
        e.preventDefault();
        history.push(`info/cookbook/${id}`);
      }}
    >
      <MinimizedCardText type={type}>{name}</MinimizedCardText>
    </MinimizedCard>
  );
};

CookCardMenuComponent.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  _id: PropTypes.number,
};
