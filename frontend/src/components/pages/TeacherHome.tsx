import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../providers/UserProvider';
import { Spinner } from '../atoms';
import { TeacherProfile } from '../organisms/TeacherProfile/TeacherProfile';

export const TeacherHome: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [daycare, setDaycare] = useState();
  const { currentUser } = useContext(CurrentUserContext);

  const fetchDaycare = () => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/v1/darecare/${currentUser.daycareId}`)
      .then((res) => setDaycare(res.data))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDaycare();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div>エラーです</div>
      ) : (
        <TeacherProfile
          firstName={currentUser.firstName}
          lastName={currentUser.lastName}
          selfIntroduction={currentUser.selfIntroduction}
          daycareName={daycare.name}
          // onClick={}
        />
      )}
    </>
  );
};
