import React from 'react';
import styled from 'styled-components';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      '& > * + *': {
        position: 'relative',
      },
    },
  }),
);

const MyCircularProgress = styled(CircularProgress)`
  top: 50%;
  left: 50%;
  margin: 0;
  position: absolute;
  margin-right: -50%;
`;

export type Props = {
  color?: 'inherit' | 'primary' | 'secondary';
};

export const Spinner: React.FC<Props> = (props) => {
  const { color } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MyCircularProgress color={color} />
    </div>
  );
};
