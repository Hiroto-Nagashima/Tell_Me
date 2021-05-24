import axios from 'axios';
import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { CurrentUserContext } from '../../providers/UserProvider';
import { Daycare } from '../../types/frontend/daycare';
import { CustomizedSnackbar, Spinner } from '../atoms';
import { PostForm } from '../organisms/PostForm/PostForm';

export const TeacherAnnouncement: React.FC = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { teacherId } = useParams<{ teacherId: string }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [postContent, setPostContent] = useState<string | null>('');
  const [message, setMassage] = useState('');
  const [daycare, setDaycare] = useState<Daycare>({} as Daycare);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [severity, setSeverity] =
    useState<'error' | 'warning' | 'info' | 'success'>('error');

  const onChangePostContent = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setPostContent(e.target.value);
    },
    [],
  );

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

  const fetchDaycare = (daycareId: number) => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/v1/daycares/${daycareId}`)
      .then((res) => setDaycare(res.data.daycare))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };
  const onClickPost = () => {
    axios
      .post(
        `http://localhost:5000/api/v1/daycares/${daycare.id}/teachers/${teacherId}/postAnnouncement`,
      )
      .then((res) => {
        setMassage(res.data.message);
        setSeverity('success');
      });
  };

  useEffect(() => {
    const daycareId = currentUser.daycareId;
    currentUser.daycareId && fetchDaycare(daycareId);
  }, [currentUser.daycareId]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div>エラーです</div>
      ) : (
        <>
          <PostForm
            src={`https://d2hmx91pr90hgc.cloudfront.net/uploads/user/image/${teacherId}/image.jpeg`}
            value={postContent}
            onClick={onClickPost}
            onChange={onChangePostContent}
          />
          <CustomizedSnackbar
            open={isSnackbarOpen}
            onClose={handleSnackbarClose}
            severity={severity}
          >
            {message}
          </CustomizedSnackbar>
        </>
      )}
    </>
  );
};
