import { Box } from '@material-ui/core';
import axios from 'axios';
import styled from 'styled-components';
import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Post } from '../../types/api/post';
import { Daycare } from '../../types/frontend/daycare';
import { useParams } from 'react-router-dom';
import { CurrentUserContext } from '../../providers/UserProvider';

import { CustomizedSnackbar, Spinner } from '../atoms';
import { PostCard, PostForm } from '../organisms';

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const TeacherAnnouncement: React.FC = () => {
  const { teacherId } = useParams<{ teacherId: string }>();

  const { currentUser } = useContext(CurrentUserContext);

  const userNameArr = [currentUser.lastName, currentUser.firstName];
  const userName = userNameArr.join('');

  const [posts, setPosts] = useState<Array<Post>>([]);
  const [error, setError] = useState(false);
  const [message, setMassage] = useState('');
  const [daycare, setDaycare] = useState<Daycare>({} as Daycare);
  const [loading, setLoading] = useState(false);
  const [postContent, setPostContent] = useState<string | null>('');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [severity, setSeverity] =
    useState<'error' | 'warning' | 'info' | 'success'>('error');

  const onChangePostContent = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setPostContent(e.target.value);
    },
    [],
  );

  const onCloseSnackbar = useCallback(
    (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setIsSnackbarOpen(false);

      return;
    },
    [],
  );

  const fetchDaycare = (daycareId: number | null) => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/v1/daycares/${daycareId}`)
      .then((res) => setDaycare(res.data.daycare))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  const fetchAllUserPosts = (daycareId: number | null) => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/v1/daycares/${daycareId}/posts`)
      .then((res) => setPosts(res.data))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  const tryPost = () => {
    setLoading(true);
    axios
      .post(
        `http://localhost:5000/api/v1/daycares/${daycare.id}/users/${teacherId}/posts`,
        {
          params: {
            poster: userName,
            content: postContent,
          },
        },
      )
      .then((res) => {
        if (res.data.status == '422') {
          setSeverity('error');
          setMassage(res.data.message);
        } else {
          setSeverity('success');
          setMassage(res.data.message);
        }
      })
      .catch(() => {
        setMassage('投稿に失敗しました');
        setSeverity('error');
      })
      .finally(() => {
        setLoading(false);
        setIsSnackbarOpen(true);
      });
  };

  useEffect(() => {
    const daycareId = currentUser.daycareId;
    currentUser.daycareId &&
      (fetchDaycare(daycareId), fetchAllUserPosts(daycareId));
  }, [currentUser.daycareId]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div>エラーです</div>
      ) : (
        <FlexBox>
          <div>
            <PostForm
              src={`https://d2hmx91pr90hgc.cloudfront.net/uploads/user/image/${teacherId}/image.jpeg`}
              value={postContent}
              onClickPost={tryPost}
              onChangePostContent={onChangePostContent}
            />
            {posts
              .slice(0)
              .reverse()
              .map((post) => {
                return (
                  <Box key={post.id} my={2}>
                    <PostCard
                      poster={post.poster}
                      teacherId={post.user_id}
                      content={post.content}
                      createdAt={post.created_at}
                    />
                  </Box>
                );
              })}
            <CustomizedSnackbar
              open={isSnackbarOpen}
              onClose={onCloseSnackbar}
              severity={severity}
            >
              {message}
            </CustomizedSnackbar>
          </div>
        </FlexBox>
      )}
    </>
  );
};
