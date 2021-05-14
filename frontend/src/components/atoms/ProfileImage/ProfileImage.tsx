import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  }),
);

export const ProfileImage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar
        alt="Profile Image"
        src={`${process.env.PUBLIC_URL}/noimage.jpeg`}
        className={classes.large}
      />
    </div>
  );
};
