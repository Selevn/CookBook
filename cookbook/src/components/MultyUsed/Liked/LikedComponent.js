import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/all';
import PropTypes from 'prop-types';
import { ViewsContainer, ViewsParagraph } from '../Views/style/ViewsComponentStyle';

const LikedComponent = ({ count, liked }) => {
  return (
    <ViewsContainer>
      {liked ? <FaHeart size="14px" color="var(--primary-color)" /> : <FaRegHeart size="14px" />}
      <ViewsParagraph>{count} likes</ViewsParagraph>
    </ViewsContainer>
  );
};
LikedComponent.propTypes = {
  count: PropTypes.number,
  liked: PropTypes.bool,
};
LikedComponent.defaultProps = {
  count: 0,
  liked: false,
};
export default LikedComponent;
