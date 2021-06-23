import { Grid } from '@material-ui/core';
import axios from 'axios';
import format from 'date-fns/format';
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

const PostArea = styled(Grid)`
  margin: 3% 0;
`;

export const TeacherAnnouncement: React.FC = () => {
  const { teacherId } = useParams<{ teacherId: string }>();

  const { currentUser } = useContext(CurrentUserContext);

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  const userNameArr = [currentUser.lastName, currentUser.firstName];
  const userName = userNameArr.join('');

  const [posts, setPosts] = useState<Array<Post>>([]);
  const [error, setError] = useState(false);
  const [message, setMassage] = useState('');
  const [daycare, setDaycare] = useState<Daycare>({} as Daycare);
  const [loading, setLoading] = useState(false);
  const [postContent, setPostContent] = useState<string | null>('');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState<
    'error' | 'warning' | 'info' | 'success'
  >('error');

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
      .get(`${API_ENDPOINT}daycares/${daycareId}`)
      .then((res) => setDaycare(res.data.daycare))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  const fetchAllUserPosts = (daycareId: number | null) => {
    setLoading(true);
    axios
      .get(`${API_ENDPOINT}daycares/${daycareId}/posts`)
      .then((res) => setPosts(res.data))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  const tryPost = () => {
    setLoading(true);
    axios
      .post(`${API_ENDPOINT}daycares/${daycare.id}/users/${teacherId}/posts`, {
        params: {
          poster: userName,
          content: postContent,
        },
      })
      .then((res) => {
        setPosts(res.data.posts);
        setPostContent(null);
        setSeverity('success');
        setMassage(res.data.message);
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
        <Grid container justify="center" alignItems="center">
          <Grid item md={6} xs={11}>
            <PostForm
              src={`https://d2hmx91pr90hgc.cloudfront.net/uploads/user/image/${teacherId}/image.jpeg`}
              value={postContent}
              onClickPost={tryPost}
              onChangePostContent={onChangePostContent}
            />
          </Grid>
          {posts
            .slice(0)
            .reverse()
            .map((post) => {
              return (
                <PostArea item md={7} xs={11} key={post.id}>
                  <PostCard
                    poster={post.poster}
                    teacherId={post.user_id}
                    content={post.content}
                    createdAt={format(
                      new Date(post.created_at),
                      'yyyy-MM-dd HH:mm',
                    )}
                  />
                </PostArea>
              );
            })}
          <CustomizedSnackbar
            open={isSnackbarOpen}
            onClose={onCloseSnackbar}
            severity={severity}
          >
            {message}
          </CustomizedSnackbar>
        </Grid>
      )}
    </>
  );
};

TeacherAnnouncement.displayName = 'Announcement';
