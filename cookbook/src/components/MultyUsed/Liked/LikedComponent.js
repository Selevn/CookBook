import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/all';
import PropTypes from 'prop-types';
import { ViewsContainer, ViewsParagraph } from '../Views/style/ViewsComponentStyle';

const LikedComponent = ({ count, isLiked, doLike }) => {
  return (
    <ViewsContainer clickable onClick={doLike}>
      {isLiked ? <FaHeart size="14px" color="var(--primary-color)" /> : <FaRegHeart size="14px" />}
      <ViewsParagraph>{count} likes</ViewsParagraph>
    </ViewsContainer>
  );
};
LikedComponent.propTypes = {
  count: PropTypes.number,
  isLiked: PropTypes.bool,
  doLike: PropTypes.func,
};
LikedComponent.defaultProps = {
  count: 0,
  isLiked: false,
  doLike: () => {},
};
export default LikedComponent;
