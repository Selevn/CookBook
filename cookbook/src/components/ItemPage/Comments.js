import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';
import { ButtonStyled, H1Styled, InputStyled } from '../common/StylesComponent';
import { CommentsContainer, CreateComment } from './style/ItemPageComponentStyle';
import { Loading } from '../MultyUsed/Loading/Loading';
import { Comment } from '../MultyUsed/Comment';
import { useFetch } from '../MultyUsed/CustomHooks/useFetch';
import {COMMENT_FIELDS, MESSAGES, ROUTES, TOAST_SETTINGS} from '../../constants';
import { SendData } from '../../Connectors/dataProvider';
import { ServerMessageHandler } from '../MultyUsed/ResponseSuccesHandler';
import { useLogout } from '../MultyUsed/CustomHooks/useLogout';

const ItemCommentsContainer = ({ id, type, profile, auth }) => {
  const [comments, setComments] = useState([]);

  const [fetchComments, hasNext, loading, count] = useFetch(ROUTES.COMMENTS, setComments, {
    type,
    itemId: id,
  });
  const [total, setTotal] = useState(count);
  const Logout = useLogout();

  useEffect(() => {
    fetchComments('start');
  }, [id, type]);

  useEffect(() => {
    setTotal(count);
  }, [count]);

  const [post, setPost] = useState('');
  const postLocalComment = useCallback(
    (comment) => {
      comments.unshift(comment);
      setComments([...comments]);
      setTotal((s) => s + 1);
    },
    [profile, comments],
  );

  const postServerComment = useCallback(
    (comment) => {
      (async () => {
        const data = await SendData(
          ROUTES.USER_COMMENT,
          { [COMMENT_FIELDS.itemType]:type, [COMMENT_FIELDS.itemId]: id, [COMMENT_FIELDS.text]:comment.text, [COMMENT_FIELDS.date]:comment.date, [COMMENT_FIELDS.author]: profile._id },
          auth,
          Logout,
        );
        ServerMessageHandler(data, null, () => {
          comments.shift();
          setTotal((s) => s - 1);
        });
      })();
    },
    [profile, comments],
  );

  const postComment = useCallback(() => {
    if (profile) {
      const comment = {
        author: [{ name: profile.name, image: profile.image }],
        text: post,
        date: Date.now(),
      };
      postLocalComment(comment);
      postServerComment(comment);
    } else {
      toast.error(MESSAGES.ERROR.AUTH, TOAST_SETTINGS);
    }
  }, [id, type, profile, auth, post]);

  return (
    <CommentsContainer>
      <H1Styled>Comments ({total})</H1Styled>
      <CreateComment>
        <InputStyled
          placeholder="Express yourself..."
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <ButtonStyled small onClick={postComment}>
          Post
        </ButtonStyled>
      </CreateComment>
      <InfiniteScroll
        dataLength={comments?.length}
        hasMore={hasNext && !loading}
        loader={<Loading />}
        next={fetchComments}
        className="infinity-scroller"
      >
        {comments && comments.map((i) => <Comment key={`${i._id}comment`} {...i} />)}
        {loading && <Loading />}
        {!loading && comments?.length === 0 && <h1>No comments</h1>}
      </InfiniteScroll>
    </CommentsContainer>
  );
};

export default ItemCommentsContainer;

ItemCommentsContainer.propTypes = {
  auth: PropTypes.string,
  id: PropTypes.number,
  profile: PropTypes.shape({
    _id: PropTypes.number,
    name: PropTypes.object,
    image: PropTypes.string,
  }),
  type: PropTypes.string,
};
