import React from 'react';
import PropTypes from 'prop-types';
import {
  Body,
  CommentContainer,
  Header,
  Name,
  PersonImage,
  TextDataContainer,
} from './style/CommentComponentStyle';
import { ParagraphStyled } from '../../common/StylesComponent';
import moment from "moment/moment";


const CommentComponent = ({ author, text, date }) => {
  return (
    <CommentContainer>
      <PersonImage src={author[0]?.image} />
      <TextDataContainer>
        <Header>
          <Name to={`/profile/${author[0]?._id}`}>
            {`${author[0]?.name.first} ${author[0]?.name.last}`}
          </Name>
          <ParagraphStyled>{moment(date).fromNow()}</ParagraphStyled>
        </Header>
        <Body>{text}</Body>
      </TextDataContainer>
    </CommentContainer>
  );
};
CommentComponent.propTypes = {
  author: PropTypes.array,
  text: PropTypes.string,
  date: PropTypes.string,
};

export default CommentComponent;
