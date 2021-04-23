import React from 'react';
import { FaComment, FaRegComment } from 'react-icons/all';
import PropTypes from 'prop-types';
import { ViewsContainer, ViewsParagraph } from '../Views/style/ViewsComponentStyle';

const CommentedComponent = ({ count, commented }) => {
  return (
    <ViewsContainer>
      {commented ? (
        <FaComment size="18px" color="var(--primary-color)" />
      ) : (
        <FaRegComment size="18px" />
      )}
      <ViewsParagraph>{count} comments</ViewsParagraph>
    </ViewsContainer>
  );
};

CommentedComponent.propTypes = {
  count: PropTypes.number,
  commented: PropTypes.bool,
};
export default CommentedComponent;
