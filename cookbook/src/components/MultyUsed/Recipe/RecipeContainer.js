import React from 'react';
import PropTypes from 'prop-types';
import { FaRegEdit, FaWindowClose } from 'react-icons/all';
import { Author, Description, Name } from '../CookCard/style/CookCardComponentStyle';
import { Liked } from '../Liked';
import { Commented } from '../Commented';
import { Views } from '../Views';
import { Image } from '../../common/StylesComponent';

import foodImage from '../../common/images/cookbook1.jpg';
import {
  DataContainer,
  ImageContainer,
  RecipeContainer,
  Statistics,
  ToolsContainer,
} from './style/RecipeContainerStyle';

export const Recipe = ({
  views,
  likes,
  comments,
  isLiked,
  isCommented,
  author,
  name,
  desc,
  // eslint-disable-next-line
  type,
  isMy,
}) => {
  return (
    <RecipeContainer>
      <ImageContainer>
        <Image src={foodImage} width="235px" height="178px" />
      </ImageContainer>
      <DataContainer>
        <Name>{name}</Name>
        <Author>{author}</Author>
        <Description>{desc}</Description>
        <Statistics>
          <Liked liked={isLiked} count={likes} />
          <Commented commented={isCommented} count={comments} />
          <Views count={views} />
        </Statistics>
      </DataContainer>
      {isMy && (
        <>
          <ToolsContainer>
            <FaRegEdit size="30px" color="var(--text-gray)" className="tool" />
            <FaWindowClose size="30px" color="var(--text-gray)" className="tool" />
          </ToolsContainer>
        </>
      )}
    </RecipeContainer>
  );
};

Recipe.propTypes = {
  views: PropTypes.number,
  likes: PropTypes.number,
  comments: PropTypes.number,
  isLiked: PropTypes.bool,
  isCommented: PropTypes.bool,
  author: PropTypes.string,
  name: PropTypes.string,
  desc: PropTypes.string,
  type: PropTypes.string,
  isMy: PropTypes.bool,
};
Recipe.defaultProps = {
  views: 999,
  likes: 400,
  comments: 7,
  isLiked: false,
  isCommented: false,
  author: 'John Doe',
  name: 'Fresh meat',
  desc:
    'Lorem ipsum dolor sit amet, consectetur' +
    'adipiscing elit. Magna amet etiam risus' +
    'aliquet sit vel venenatis. Dolor, risus' +
    'sit aliquam pharetra. ',
  type: 'small',
  isMy: true,
};

export default Recipe;
