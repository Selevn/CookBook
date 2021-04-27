import React from 'react';
import PropTypes from 'prop-types';
import { FaRegEdit, FaWindowClose } from 'react-icons/all';
import { useHistory } from 'react-router-dom';
import { Author, Description, Name } from '../CookCard/style/CookCardComponentStyle';
import { Liked } from '../Liked';
import { Commented } from '../Commented';
import { Views } from '../Views';
import { ButtonStyled, Image, LinkStyled } from '../../common/StylesComponent';

import foodImage from '../../common/images/cookbook1.jpg';
import {
  DataContainer,
  ImageContainer,
  RecipeContainer,
  RemoveContainer,
  Statistics,
  ToolsContainer,
  RecipeContainerWrapper,
  SaveContainer,
} from './style/RecipeContainerStyle';

RecipeContainerWrapper.propTypes = { children: PropTypes.node };

SaveContainer.propTypes = { children: PropTypes.node };
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
  removable,
  savable,
  handleRemove,
}) => {
  const history = useHistory();
  return (
    <RecipeContainerWrapper
      onClick={() => {
        history.push('/info/recipe/1');
      }}
      className="hoverer"
    >
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
        {savable && (
          <>
            <SaveContainer>
              <ButtonStyled secondary light thick>
                Save
              </ButtonStyled>
            </SaveContainer>
          </>
        )}
      </RecipeContainer>
      {removable && (
        <RemoveContainer>
          <LinkStyled secondary onClick={handleRemove}>
            Remove
          </LinkStyled>
        </RemoveContainer>
      )}
    </RecipeContainerWrapper>
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
  removable: PropTypes.bool,
  savable: PropTypes.bool,
  handleRemove: PropTypes.func,
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
  isMy: false,
  removable: false,
  savable: true,
  handleRemove: () => {
    // eslint-disable-next-line
    console.log('removed!');
  },
};

export default Recipe;
