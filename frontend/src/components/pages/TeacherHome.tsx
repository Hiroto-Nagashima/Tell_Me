import React, { useContext, useEffect, useState } from 'react';
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as H from 'history';
import { Spinner } from '../atoms';
import axios from 'axios';
import { Kid } from '../../types/api/kid';
import { CurrentUserContext } from '../../providers/UserProvider';
import { User } from '../../types/api/user';
import { Notebook } from '../../types/api/notebook';

type Props = {
  history: H.History;
};

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
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
    minWidth: 700,
  },
});

type KidInfo = {
  kid: Kid;
  mother: User | null;
  father: User | null;
  notebook: Notebook | null;
};

export const TeacherHome: React.FC<Props> = () => {
  const classes = useStyles();
  const { currentUser } = useContext(CurrentUserContext);
  const [kids, setKids] = useState<Array<KidInfo>>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchAllKid = async (daycareId: number) => {
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
    fetchAllKid(daycareId);
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div>エラー</div>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>園児</StyledTableCell>
                  <StyledTableCell align="right">父</StyledTableCell>
                  <StyledTableCell align="right">母</StyledTableCell>
                  <StyledTableCell align="right">最新の連絡帳</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {kids.map((kid) => (
                  <StyledTableRow key={kid.kid.id}>
                    <StyledTableCell component="th" scope="row">
                      {kid.kid.last_name}
                      {kid.kid.first_name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {kid.mother == null
                        ? 'データがありません'
                        : kid.mother.first_name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {kid.father == null
                        ? 'データがありません'
                        : kid.father.first_name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {kid.notebook == null
                        ? 'データがありません'
                        : kid.notebook.id}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};
