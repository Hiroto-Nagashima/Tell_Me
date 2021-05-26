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
import { CurrentUserContext } from '../../providers/UserProvider';

import { Box } from '@material-ui/core';
import { CustomizedSnackbar, Spinner } from '../atoms';
import { PostCard, TeacherProfile, UpdateTeacherModal } from '../organisms';

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const TeacherHome: React.FC = () => {
  const { currentUser } = useContext(CurrentUserContext);

  const [posts, setPosts] = useState<Array<Post>>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMassage] = useState('');
  const [daycare, setDaycare] = useState<Daycare>({} as Daycare);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [selfIntroduction, setSelfIntroduction] = useState<string | null>('');
  const [severity, setSeverity] =
    useState<'error' | 'warning' | 'info' | 'success'>('error');

  const onChangeSelfIntroduction = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSelfIntroduction(e.target.value);
    },
    [],
  );

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

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

  const tryUpdateTeacher = () => {
    setLoading(true);
    axios
      .put(`http://localhost:5000/api/v1/users/${currentUser.id}`, {
        params: {
          self_introduction: selfIntroduction,
        },
      })
      .then((res) => {
        setSelfIntroduction(res.data.selfIntroduction);
        setMassage(res.data.message);
        setIsModalOpen(false);
        setSeverity('success');
      })
      .catch(() => {
        setMassage('登録に失敗しました');
        setSeverity('error');
      })
      .finally(() => {
        setLoading(false);
        setIsSnackbarOpen(true);
      });
  };

  const fetchAllUserPosts = (daycareId: number | null) => {
    setLoading(true);
    axios
      .get(
        `http://localhost:5000/api/v1/daycares/${daycareId}/users/${currentUser.id}/posts/user_posts`,
      )
      .then((res) => {
        setPosts(res.data);
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  const fetchDaycare = (daycareId: number | null) => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/v1/daycares/${daycareId}`)
      .then((res) => setDaycare(res.data.daycare))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const daycareId = currentUser.daycareId;
    currentUser.daycareId &&
      (fetchDaycare(daycareId),
      fetchAllUserPosts(daycareId),
      setSelfIntroduction(currentUser.selfIntroduction));
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
            <TeacherProfile
              firstName={currentUser.firstName}
              lastName={currentUser.lastName}
              selfIntroduction={selfIntroduction}
              daycareName={daycare.name}
              onClick={onOpenModal}
            />
            <UpdateTeacherModal
              open={isModalOpen}
              selfIntroduction={selfIntroduction}
              onCloseModal={onCloseModal}
              onClickSubmit={tryUpdateTeacher}
              onChange={onChangeSelfIntroduction}
            />
            {posts.map((post) => {
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
