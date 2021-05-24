import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FaRegEdit, FaWindowClose} from 'react-icons/all';
import {useHistory} from 'react-router-dom';
import {Author, Description, Name} from '../CookCard/style/CookCardComponentStyle';
import {Liked} from '../Liked';
import {Commented} from '../Commented';
import {Views} from '../Views';
import {ButtonStyled, Image, LinkStyled} from '../../common/StylesComponent';

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
import {useReduxState} from "../CustomHooks/useReduxState";

RecipeContainerWrapper.propTypes = {children: PropTypes.node};

SaveContainer.propTypes = {children: PropTypes.node};
export const Recipe = ({
                           views,
                           likes,
                           commentsIds: comments,
                           isCommented,
                           author,
                           name,
                           desc,
                           // eslint-disable-next-line
                           type,
                           isMy,
                           savable,
                           onSavable,
                           editable,
                           onEditable,
                           removable,
                           onRemovable,
                           handleRemove,
                           image,
                           small,
                           _id: id,
                       }) => {
    const {profile} = useReduxState();
    const [isLiked, setIsLiked] = useState(profile && profile.likes.recipes.includes(id) || false)
    const description = `${desc?.slice(0, desc?.indexOf(' ', 250))}...`;
    const history = useHistory();
    return (
        <RecipeContainerWrapper
            small={small}
            onClick={() => {
                history.push(`/info/recipe/${id}`);
            }}
            className="hoverer"
        >
            <RecipeContainer>
                <ImageContainer>
                    <Image src={image} width="235px" height="178px" radius="10px"/>
                </ImageContainer>
                <DataContainer>
                    <Name>{name}</Name>
                    <Author>{`${author && author[0]?.name.first} ${author && author[0]?.name.last}`}</Author>

                    {!small &&

                    <Description>{description}</Description>}
                    <Statistics>
                        <Liked isLiked={isLiked} count={likes}/>
                        {!small &&<Commented commented={isCommented} count={comments.length}/>}
                        {!small &&<Views count={views}/>}
                        {editable && <LinkStyled to={`/editRecipe?id=${id}`}>Edit</LinkStyled>}
                    </Statistics>
            </DataContainer>
            {isMy && (
                <>
                    <ToolsContainer>
                        <FaRegEdit size="30px" color="var(--text-gray)" className="tool"/>
                        <FaWindowClose size="30px" color="var(--text-gray)" className="tool"/>
                    </ToolsContainer>
                </>
            )}
            {savable && (
                <>
                    <SaveContainer>
                        <ButtonStyled secondary light thick onClick={(e) => {
                            e.stopPropagation()
                            onSavable()
                        }}>
                            Add
                        </ButtonStyled>
                    </SaveContainer>
                </>
            )}
            {removable && (
                <SaveContainer>
                    <ButtonStyled secondary light thick onClick={(e) => {
                        e.stopPropagation()
                        onRemovable()
                    }}>
                        Remove
                    </ButtonStyled>
                </SaveContainer>
            )}
        </RecipeContainer>
</RecipeContainerWrapper>
);
};

Recipe.propTypes = {
    views: PropTypes.number,
    likes: PropTypes.number,
    commentsIds: PropTypes.array,
    isLiked: PropTypes.bool,
    isCommented: PropTypes.bool,
    author: PropTypes.array,
    name: PropTypes.string,
    desc: PropTypes.string,
    type: PropTypes.string,
    isMy: PropTypes.bool,
    removable: PropTypes.bool,
    savable: PropTypes.bool,
    handleRemove: PropTypes.func,
    _id: PropTypes.number,
    image: PropTypes.string,
};

export default Recipe;
