import {ButtonStyled, Container, H1Styled, InputStyled} from "../common/StylesComponent";
import {Comments, CommentsContainer, CreateComment} from "./style/ItemPageComponentStyle";
import {Loading} from "../MultyUsed/Loading/Loading";
import {Comment} from "../MultyUsed/Comment";
import React, {useCallback, useEffect, useState} from "react";
import {useFetch} from "../MultyUsed/CustomHooks/useFetch";
import {MESSAGES, ROUTES, TOAST_SETTINGS} from "../../constants";
import InfiniteScroll from "react-infinite-scroll-component";
import {SendData} from "../../Connectors/dataProvider";
import {toast} from "react-toastify";
import {ServerMessageHandler} from "../MultyUsed/ResponseSuccesHandler";
import {useLogout} from "../MultyUsed/CustomHooks/useLogout";

const ItemCommentsContainer = ({id, type, profile, auth}) => {
    const [comments, setComments] = useState([]);
    let fetchComments, hasNext, loading, count;

    [fetchComments, hasNext, loading, count] = useFetch(ROUTES.COMMENTS, setComments, {type: type, itemId: id})
    const [total, setTotal] = useState(count)
    const Logout = useLogout()


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
            const data = await SendData(ROUTES.USER_COMMENT, {type, itemId: id, comment, userId: profile._id}, auth, Logout)
            ServerMessageHandler(data, null, () => {
                comments.shift()
                setTotal(s => s - 1)
            })
        })()
    }, [profile, comments])


    const postComment = useCallback(() => {
        if (profile) {
            const comment = {author: [{name: profile.name, image: profile.image}], text: post, date: Date.now()}
            postLocalComment(comment);
            postServerComment(comment);
        } else {
            toast.error(MESSAGES.ERROR.AUTH, TOAST_SETTINGS)
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