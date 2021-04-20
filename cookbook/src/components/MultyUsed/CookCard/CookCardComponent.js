import React from 'react';
import PropTypes from 'prop-types';
import CoolBook from '../../common/images/cookbook1.jpg';
import { Author, CookCardContainer, Name } from './style/CookCardComponentStyle';
import { Container, Image } from '../../common/StylesComponent';
import { Views } from '../Views';
import { Commented } from '../Commented';
import { Liked } from '../Liked';

const CookCardComponent = ({ views, likes, comments, isLiked, isCommented, author, name }) => {
  return (
    <CookCardContainer vertical>
      <Views count={views} />
      <Image src={CoolBook} width="215" height="215" alt="CookBook front image" />
      <Container vertical>
        <Name>{name}</Name>
        <Author>{author}</Author>
      </Container>
      <Container margin="8px 0 0 0" justifyContent="space-between">
        <Liked count={likes} liked={isLiked} />
        <Commented count={comments} commented={isCommented} />
      </Container>
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
};
CookCardComponent.defaultProps = {
  views: 999,
  likes: 400,
  comments: 7,
  isLiked: false,
  isCommented: false,
  author: 'John Doe',
  name: 'Fresh meat',
};

export default CookCardComponent;
