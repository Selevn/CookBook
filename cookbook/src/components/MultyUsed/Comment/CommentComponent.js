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

const CommentComponent = ({ author, text, date }) => {
  return (
    <CommentContainer>
      <PersonImage src={author && author[0].image} />
      <TextDataContainer>
        <Header>
          <Name to={`/profile/${author && author[0]._id}`}>
            {author && `${author[0].name.first} ${author[0].name.last}`}
          </Name>
          <ParagraphStyled>{date}</ParagraphStyled>
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
