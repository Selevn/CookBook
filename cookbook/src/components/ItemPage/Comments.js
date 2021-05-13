import {ButtonStyled, Container, H1Styled, InputStyled} from "../common/StylesComponent";
import {Comments, CommentsContainer, CreateComment} from "./style/ItemPageComponentStyle";
import {Loading} from "../MultyUsed/Loading/Loading";
import {Comment} from "../MultyUsed/Comment";
import React, {useCallback, useEffect, useState} from "react";
import {useFetch} from "../MultyUsed/CustomHooks/useFetch";
import {ROUTES} from "../../constants";
import InfiniteScroll from "react-infinite-scroll-component";
import {SendData} from "../../Connectors/dataProvider";
import {Recipe} from "../MultyUsed/Recipe";

const ItemCommentsContainer = ({id, type, profile, auth}) => {
    const [comments, setComments] = useState([]);
    let fetchComments, hasNext, loading, count;

    [fetchComments, hasNext, loading, count] = useFetch(ROUTES.COMMENTS, setComments, {type: type, itemId: id})
    const [total, setTotal] = useState(count)

    useEffect(() => {
        fetchComments('start');
    }, [id, type]);

    useEffect(() => {
        setTotal(count)
    }, [count])


    const [post, setPost] = useState("")
    const postLocalComment = useCallback((comment) => {
        comments.unshift(comment)
        setComments([...comments])
        setTotal(s => s + 1)
    }, [profile, comments])

    const postServerComment = useCallback((comment) => {
        (async () => {
            const data = await SendData(ROUTES.USER_COMMENT, {type, itemId:id, comment, userId:profile._id}, auth)
            if(data.success === false)
            {
                comments.shift()
                setTotal(s => s - 1)
            }
        })()
    }, [profile, comments])


    const postComment = useCallback(() => {
        const comment = {author: [{name: profile.name, image: profile.image}], text: post, date: Date.now()}
        if (profile) {
            postLocalComment(comment);
            postServerComment(comment);
        } else {
            alert("You shall be authrorized.")
        }
    }, [id, type, profile, auth, post]);



    return (
        <CommentsContainer>
            <H1Styled>Comments ({total})</H1Styled>
            <CreateComment>
                <InputStyled placeholder="Express yourself..." value={post} onChange={(e) => setPost(e.target.value)}/>
                <ButtonStyled small onClick={postComment}>Post</ButtonStyled>
            </CreateComment>
            <InfiniteScroll
                dataLength={comments?.length}
                hasMore={hasNext && !loading}
                loader={<Loading/>}
                next={fetchComments}
                className="infinity-scroller"
            >
                {comments && comments.map((i) => <Comment key={`${i._id}comment`} {...i} />)}
                {loading && <Loading/>}
                {!loading && comments?.length === 0 && (<h1>No comments</h1>)}
            </InfiniteScroll>
        </CommentsContainer>
    )
}

export default ItemCommentsContainer