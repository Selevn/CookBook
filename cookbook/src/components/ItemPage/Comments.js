import {ButtonStyled, H1Styled, InputStyled} from "../common/StylesComponent";
import {Comments, CommentsContainer, CreateComment} from "./style/ItemPageComponentStyle";
import {Loading} from "../MultyUsed/Loading/Loading";
import {Comment} from "../MultyUsed/Comment";
import React, {useCallback, useEffect, useState} from "react";
import {useFetch} from "../MultyUsed/CustomHooks/useFetch";
import {ROUTES} from "../../constants";
import InfiniteScroll from "react-infinite-scroll-component";

const ItemCommentsContainer = ({id, type, profile, auth}) => {
    const [comments, setComments] = useState([]);
    const [fetchComments, hasNext, loading, total] = useFetch(ROUTES.COMMENTS, setComments, {type: type, itemId: id})
    // firstLoad
    useEffect(() => {
        fetchComments();
    }, [id]);


    const [post, setPost] = useState("")
    const postLocalComment = useCallback((text) => {
        comments.unshift({author: [{name:profile.name, image: profile.image}], text: text, date:Date.now()})
        setComments([...comments])
    },[profile, comments])
    const postComment = useCallback(() => {
        if(profile)
        {
            postLocalComment(post);
        }
        else{
            alert("You shall be authrorized.")
        }
    },[id, type, profile, auth, post]);
    return (
        <CommentsContainer>
            <H1Styled>Comments ({total})</H1Styled>
            <CreateComment>
                <InputStyled placeholder="Express yourself..." value={post} onChange={(e) => setPost(e.target.value)}/>
                <ButtonStyled small onClick={postComment}>Post</ButtonStyled>
            </CreateComment>
            <InfiniteScroll
                dataLength={comments?.length}
                hasMore={hasNext}
                loader={<Loading />}
                next={fetchComments}
                className="infinity-scroller"
            >
                {loading && <Loading/>}
                {comments && comments.map((i) => <Comment key={`${i._id}comment`} {...i} />)}
                {!loading && comments?.length === 0 && (<h1>No comments</h1>)}
            </InfiniteScroll>
        </CommentsContainer>
    )
}

export default ItemCommentsContainer