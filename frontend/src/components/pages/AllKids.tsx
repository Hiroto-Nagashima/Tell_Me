import React, { useContext, useEffect, useState } from 'react';
import * as H from 'history';
import axios from 'axios';
import styled from 'styled-components';
import { Kid } from '../../types/api/kid';
import { User } from '../../types/api/user';
import { Notebook } from '../../types/api/notebook';
import { CurrentUserContext } from '../../providers/UserProvider';

import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';

import { Spinner } from '../atoms';
import { ParentPopover } from '../molecules/SimplePopover/ParentPopover';
import { NotebookModal } from '../organisms/NotebookModal/NotebookModal';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.error.light,
      color: theme.palette.common.white,
      fontSize: 20,
    },
    body: {
      fontSize: 16,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: '70%',
  },
});

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 85%;
`;

type KidInfo = {
  kid: Kid;
  mother: User | null;
  father: User | null;
  notebook: Notebook | null;
};

type Props = {
  history: H.History;
};

export const AllKids: React.FC<Props> = () => {
  const classes = useStyles();

  const [kids, setKids] = useState<Array<KidInfo>>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(CurrentUserContext);

  const fetchAllKids = async (daycareId: number) => {
    setLoading(true);
    await axios
      .get(`http://localhost:5000/api/v1/daycares/${daycareId}/kids`)
      .then((res) => {
        setKids(res.data);
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const daycareId = currentUser.daycareId;
    daycareId && fetchAllKids(daycareId);
  }, [currentUser.daycareId]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div>エラー</div>
      ) : (
        <Wrapper>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">園児</StyledTableCell>
                  <StyledTableCell align="center">母</StyledTableCell>
                  <StyledTableCell align="center">父</StyledTableCell>
                  <StyledTableCell align="center">最新の連絡帳</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {kids.map((kid) => (
                  <StyledTableRow key={kid.kid.id}>
                    <StyledTableCell align="center">
                      {kid.kid.last_name}
                      {kid.kid.first_name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {kid.mother == null ? (
                        '-'
                      ) : (
                        <ParentPopover
                          email={kid.mother.email}
                          buttonLabel={`${kid.mother.last_name}${kid.mother.first_name}`}
                          telephoneNumber={kid.mother.telephone_number}
                        />
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {kid.father == null ? (
                        '-'
                      ) : (
                        <ParentPopover
                          email={kid.father.email}
                          buttonLabel={`${kid.father.last_name}${kid.father.first_name}`}
                          telephoneNumber={kid.father.telephone_number}
                        />
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {kid.notebook == null ? (
                        '-'
                      ) : (
                        <NotebookModal
                          date={kid.notebook.date}
                          memo={kid.notebook.memo}
                          dinner={kid.notebook.dinner}
                          hasBathed={kid.notebook.has_bathed}
                          breakfast={kid.notebook.breakfast}
                          bodyTemperature={kid.notebook.body_temperature}
                        />
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Wrapper>
      )}
    </>
  );
};
