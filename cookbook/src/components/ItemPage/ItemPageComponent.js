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
} from './style/ItemPageComponentStyle';
import { CookCardComponent } from '../MultyUsed/CookCard/CookCardComponent';
import { HeaderStyled } from '../CreateCookBook/style/CreateCookBookComponentStyle';
import {
  ButtonStyled,
  Container,
  H1Styled,
  Image,
  InputStyled,
  LinkStyled,
  ParagraphStyled,
} from '../common/StylesComponent';
import foodImg from '../common/images/cookbook1.jpg';
import { Statistics } from '../MultyUsed/Recipe/style/RecipeContainerStyle';
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
        <Container justifyContent={'space-between'} alignItems={'center'}>
          <Statistics>
            <Liked count={likes} />
            <Commented count={comments} />
            <Views count={views} />
          </Statistics>
          <ButtonStyled medium light>
            Clone to my cookbooks
          </ButtonStyled>
        </Container>
      </CookBookContainer>
      <RecepiesContainer>
        <H1Styled>Recepies</H1Styled>
        <Container className={'recipesContainer'}>
          <Recipe />
          <Recipe />
          <Recipe />
        </Container>
      </RecepiesContainer>
      <CommentsContainer>
        <H1Styled>Comments ({comments})</H1Styled>
        <CreateComment>
          <InputStyled placeholder={'Express yourself...'} />
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
  type: PropTypes.string,
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
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum tempus viverra augue ac elit. Interdum libero at tristique fames faucibus. Massa a, consectetur et viverra vulputate urna enim felis metus. Consequat morbi cras elit mauris phasellus at fames eget. Nunc, at vitae integer morbi nibh dignissim non tempus pellentesque. Erat platea augue sed amet, tempor, sed sollicitudin. Viverra tincidunt eu nulla pulvinar eget dolor. Dui, lacus sed ut id egestas elit, mi. Pretium elementum commodo amet cursus massa dictum. Ac, pharetra nisi, morbi maecenas facilisi.\n',
  type: 'small',
};

export default ItemPageComponent;
