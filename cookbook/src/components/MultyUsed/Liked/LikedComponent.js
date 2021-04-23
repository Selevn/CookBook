import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/all';
import PropTypes from 'prop-types';
import { ViewsContainer, ViewsParagraph } from '../Views/style/ViewsComponentStyle';

const LikedComponent = ({ count, liked }) => {
  return (
    <ViewsContainer>
      {liked ? <FaHeart size="18px" color="var(--primary-color)" /> : <FaRegHeart size="18px" />}
      <ViewsParagraph>{count} likes</ViewsParagraph>
    </ViewsContainer>
  );
};
LikedComponent.propTypes = {
  count: PropTypes.number,
  liked: PropTypes.bool,
};
export default LikedComponent;
