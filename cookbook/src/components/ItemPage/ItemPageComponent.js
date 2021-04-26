import React from 'react';
import PropTypes from 'prop-types';
import { Recipe } from '../MultyUsed/Recipe';
import {
  Comments,
  CommentsContainer,
  CookBookContainer,
  CreateComment,
  Description,
  InfoContainer,
  ItemContainer,
  ItemPageImageBook,
  RecepiesContainer,
  RecipeStats,
  RecipeStatsContainer,
} from './style/ItemPageComponentStyle';
import {
  ButtonStyled,
  Container,
  H1Styled,
  InputStyled,
  LinkStyled,
  ParagraphStyled,
} from '../common/StylesComponent';
import foodImg from '../common/images/cookbook1.jpg';
import { Statistics, StatisticsContainer } from '../MultyUsed/Recipe/style/RecipeContainerStyle';
import { Comment } from '../MultyUsed/Comment';
import { Liked } from '../MultyUsed/Liked';
import { Commented } from '../MultyUsed/Commented';
import { Views } from '../MultyUsed/Views';

const ItemPageComponent = ({
  views,
  likes,
  comments,
  isLiked,
  isCommented,
  author,
  name,
  desc,
  type,
}) => {
  return (
    <ItemContainer>
      <CookBookContainer>
        <H1Styled size="56px">{name}</H1Styled>
        <LinkStyled>{author}</LinkStyled>
        <InfoContainer>
          <ItemPageImageBook src={foodImg} />
          <Description>
            <H1Styled>Description</H1Styled>
            <ParagraphStyled>{desc}</ParagraphStyled>
          </Description>
        </InfoContainer>
        {type === 'recipe' && (
          <>
            <RecipeStatsContainer>
              <RecipeStats>
                <H1Styled>Directions</H1Styled>
                <ol>
                  <li>
                    <span>e1243 12341234 12341qw</span>
                  </li>
                  <li>
                    <span>eqw</span>
                  </li>
                  <li>
                    <span>e124312 3412341 2341qw</span>
                  </li>
                  <li>
                    <span>eqw</span>
                  </li>
                  <li>
                    <span>eqw</span>
                  </li>
                </ol>
              </RecipeStats>
              <RecipeStats>
                <H1Styled>Ingredients</H1Styled>
                <ul>
                  <li>
                    <span>e12431234123412341qw</span>
                  </li>
                  <li>
                    <span>eqw</span>
                  </li>
                  <li>
                    <span>e1243123412 3412341qwe12431234 123412341qw</span>
                  </li>
                  <li>
                    <span>eqw</span>
                  </li>
                  <li>
                    <span>eqw</span>
                  </li>
                </ul>
              </RecipeStats>
            </RecipeStatsContainer>
          </>
        )}
        <StatisticsContainer>
          <Statistics>
            <Liked count={likes} isLiked={isLiked} />
            <Commented count={comments} isCommented={isCommented} />
            <Views count={views} />
          </Statistics>
          <ButtonStyled medium light>
            Clone to my {type === 'recipe' ? 'Recipes' : 'Cookbooks'}
          </ButtonStyled>
        </StatisticsContainer>
      </CookBookContainer>
      {type === 'book' && (
        <>
          <RecepiesContainer>
            <H1Styled>Recepies</H1Styled>
            <Container className="recipesContainer">
              <Recipe />
              <Recipe />
              <Recipe />
            </Container>
          </RecepiesContainer>
        </>
      )}

      <CommentsContainer>
        <H1Styled>Comments ({comments})</H1Styled>
        <CreateComment>
          <InputStyled placeholder="Express yourself..." />
          <ButtonStyled small>Post</ButtonStyled>
        </CreateComment>
        <Comments>
          <Comment />
          <Comment />
          <Comment />
        </Comments>
      </CommentsContainer>
    </ItemContainer>
  );
};

ItemPageComponent.propTypes = {
  views: PropTypes.number,
  likes: PropTypes.number,
  comments: PropTypes.number,
  isLiked: PropTypes.bool,
  isCommented: PropTypes.bool,
  author: PropTypes.string,
  name: PropTypes.string,
  desc: PropTypes.string,
  type: PropTypes.oneOf(['book', 'recipe']),
};
ItemPageComponent.defaultProps = {
  views: 999,
  likes: 400,
  comments: 7,
  isLiked: false,
  isCommented: false,
  author: 'John Doe',
  name: 'Fresh meat',
  desc:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum tempus vi nibh dignissim' +
    'non tempus pellentesque. Erat platea augue sed amet,tempor, sed sollicitudin. Viverra tin' +
    'eu nulla pulvinar eget dolor. Dui, lacus sed ut id egestas elit, mi. Pretium elementum co' +
    'amet cursus massa dictum. Ac, pharetra nisi, morbi maecenas facilisi.\n',
  type: 'recipe',
};

export default ItemPageComponent;
