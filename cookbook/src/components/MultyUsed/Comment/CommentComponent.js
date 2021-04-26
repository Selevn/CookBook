import React from 'react';
import PropTypes from 'prop-types';
import person from '../../common/images/Person.jpeg';
import {
  Body,
  CommentContainer,
  Header,
  Name,
  PersonImage,
  TextDataContainer,
} from './style/CommentComponentStyle';
import { ParagraphStyled } from '../../common/StylesComponent';

const CommentComponent = ({ name, text, date }) => {
  return (
    <CommentContainer>
      <PersonImage src={person} />
      <TextDataContainer>
        <Header>
          <Name>{name}</Name>
          <ParagraphStyled>{date}</ParagraphStyled>
        </Header>
        <Body>{text}</Body>
      </TextDataContainer>
    </CommentContainer>
  );
};

CommentComponent.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
};
CommentComponent.defaultProps = {
  name: 'Anna Dark',
  text:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
    'Magna amet etiam risus aliquet sit vel venenatis. Dolor,' +
    'Magna amet etiam risus aliquet sit vel venenatis. Dolor,' +
    'Magna amet etiam risus aliquet sit vel venenatis. Dolor,' +
    'Magna amet etiam risus aliquet sit vel venenatis. Dolor,' +
    'Magna amet etiam risus aliquet sit vel venenatis. Dolor,' +
    'Magna amet etiam risus aliquet sit vel venenatis. Dolor,' +
    'risus sit aliquam pharetra. ',
  date: '5 minutes ago',
};

export default CommentComponent;
