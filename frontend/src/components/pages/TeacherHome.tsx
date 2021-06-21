import axios from 'axios';
import styled from 'styled-components';
import format from 'date-fns/format';
import Resizer from 'react-image-file-resizer';
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
import {
  PostCard,
  UpdateModal,
  UpdateTeacher,
  TeacherProfile,
} from '../organisms';

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const TeacherHome: React.FC = () => {
  const { currentUser } = useContext(CurrentUserContext);

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  const [image, setImage] = useState<string | Blob | ProgressEvent<FileReader>>(
    '',
  );
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMassage] = useState('');
  const [daycare, setDaycare] = useState<Daycare>({} as Daycare);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [selfIntroduction, setSelfIntroduction] = useState<string | null>('');
  const [severity, setSeverity] = useState<
    'error' | 'warning' | 'info' | 'success'
  >('error');

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

  const resizeFile = (file: File) =>
    new Promise(
      (
        resolve: (
          value: string | Blob | File | ProgressEvent<FileReader>,
        ) => void,
      ) => {
        Resizer.imageFileResizer(
          file,
          300,
          300,
          'JPEG',
          100,
          0,
          (uri) => {
            resolve(uri);
          },
          'base64',
        );
      },
    );

  const tryResizeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files![0];
      const image = await resizeFile(file);
      setImage(image);
      setDisabled(false);

      return image;
    } catch (err) {
      alert(err);
    }
  };

  const onClickSubmitFile = async () => {
    const submitData = new FormData();
    submitData.append('image', image as string | Blob);
    await axios
      .post(
        `${API_ENDPOINT}users/${currentUser.id}/register_image`,
        submitData,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        },
      )
      .then((res) => {
        setMassage(res.data.message);
        setImage('');
        setDisabled(true);
        setIsModalOpen(false);
        setSeverity(res.data.severity);
      })
      .catch(() => {
        setMassage('更新失敗しました');
        setSeverity('error');
      })
      .finally(() => {
        setLoading(false);
        setIsSnackbarOpen(true);
      });
  };

  const tryUpdateTeacher = () => {
    setLoading(true);
    axios
      .put(`${API_ENDPOINT}users/${currentUser.id}`, {
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
      .get(`${API_ENDPOINT}daycares/${daycareId}/users/${currentUser.id}/posts`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  const fetchDaycare = (daycareId: number | null) => {
    setLoading(true);
    axios
      .get(`${API_ENDPOINT}daycares/${daycareId}`)
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
            <UpdateModal
              open={isModalOpen}
              disabled={disabled}
              onChangeFile={tryResizeFile}
              onCloseModal={onCloseModal}
              onClickSubmitFile={onClickSubmitFile}
              onClickSubmitProfile={tryUpdateTeacher}
            >
              <UpdateTeacher
                selfIntroduction={selfIntroduction}
                onChangeSelfIntroduction={onChangeSelfIntroduction}
              />
            </UpdateModal>
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
                      createdAt={format(
                        new Date(post.created_at),
                        'yyyy-MM-dd HH:mm',
                      )}
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

TeacherHome.displayName = 'Home';
