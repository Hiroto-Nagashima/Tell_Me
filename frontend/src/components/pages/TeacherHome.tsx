import axios from 'axios';
import styled from 'styled-components';
import React, { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../providers/UserProvider';
import { Daycare } from '../../types/frontend/daycare';
import { Spinner } from '../atoms';
import { TeacherProfile } from '../organisms/TeacherProfile/TeacherProfile';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export const TeacherHome: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [daycare, setDaycare] = useState<Daycare>({} as Daycare);
  const { currentUser } = useContext(CurrentUserContext);

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
    currentUser.daycareId && fetchDaycare(daycareId);
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
              selfIntroduction={currentUser.selfIntroduction}
              daycareName={daycare.name}
              // onClick={}
            />
          </div>
        </Wrapper>
      )}
    </>
  );
};
