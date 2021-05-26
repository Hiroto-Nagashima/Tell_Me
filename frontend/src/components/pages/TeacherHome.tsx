import axios from 'axios';
import styled from 'styled-components';
import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CurrentUserContext } from '../../providers/UserProvider';
import { Post } from '../../types/api/post';
import { PostCard } from '../organisms/PostCard/PostCard';
import { Daycare } from '../../types/frontend/daycare';
import { CustomizedSnackbar, Spinner } from '../atoms';
import { TeacherProfile } from '../organisms/TeacherProfile/TeacherProfile';
import { UpdateTeacherModal } from '../organisms/UpdateTeacherModal/UpdateTeacherModal';
import { Box } from '@material-ui/core';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export const TeacherHome: React.FC = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const userNameArr = [currentUser.lastName, currentUser.firstName];
  const userName = userNameArr.join('');
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [error, setError] = useState(false);
  const [message, setMassage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selfIntroduction, setSelfIntroduction] = useState<string | null>('');
  const [daycare, setDaycare] = useState<Daycare>({} as Daycare);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [severity, setSeverity] =
    useState<'error' | 'warning' | 'info' | 'success'>('error');

  const onChangeSelfIntroduction = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setSelfIntroduction(e.target.value);
    },
    [],
  );

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleUpdateTeacher = () => {
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
        setIsSnackbarOpen(true);
      })
      .catch((e) => {
        setMassage(e);
        setSeverity('error');
        setIsSnackbarOpen(true);
      })
      .finally(() => setLoading(false));
  };

  const handleSnackbarClose = useCallback(
    (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setIsSnackbarOpen(false);

      return;
    },
    [],
  );

  const fetchAllUserPosts = (daycareId: number) => {
    setLoading(true);
    axios
      .get(
        `http://localhost:5000/api/v1/daycares/${daycareId}/users/${currentUser.id}/posts/user_posts`,
      )
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  const fetchDaycare = (daycareId: number) => {
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
        <Wrapper>
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
              onClose={onCloseModal}
              onSubmit={handleUpdateTeacher}
              onChange={onChangeSelfIntroduction}
            />
            {posts.map((post) => {
              return (
                <Box key={post.id} my={2}>
                  <PostCard
                    poster={userName}
                    teacherId={post.user_id}
                    content={post.content}
                    createdAt={post.created_at}
                  />
                </Box>
              );
            })}
            <CustomizedSnackbar
              open={isSnackbarOpen}
              onClose={handleSnackbarClose}
              severity={severity}
            >
              {message}
            </CustomizedSnackbar>
          </div>
        </Wrapper>
      )}
    </>
  );
};
