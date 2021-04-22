import React from 'react';
import { FaRegEye } from 'react-icons/all';
import PropTypes from 'prop-types';
import { ViewsContainer, ViewsParagraph } from './style/ViewsComponentStyle';

const ViewsComponent = ({ count }) => {
  return (
    <ViewsContainer>
      <FaRegEye size="17px" />
      <ViewsParagraph>{count} views</ViewsParagraph>
    </ViewsContainer>
  );
};
ViewsComponent.propTypes = {
  count: PropTypes.number,
};
ViewsComponent.defaultProps = {
  count: 0,
};

export default ViewsComponent;
