import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import { SingleLineTextField } from '../atoms/SingleLineTextField';
import { FlexibleButton } from '../atoms/FlexibleButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(50),
        height: theme.spacing(60),
      },
    },
  }),
);

export type Props = {
  title: string;
  value: number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
};
export const LoginPaper: React.FC<Props> = (props) => {
  const { title, value, onClick, onChange } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <Box component="h1" p={2} textAlign="center">
          {title}
        </Box>
        <Box textAlign="center" m={4}>
          <SingleLineTextField
            textName="email"
            placeholder="xxxxxxx@xxx.ne.jp"
            value={value}
            onChange={onChange}
          />
        </Box>
        <Box textAlign="center" m={4}>
          <SingleLineTextField
            textName="password"
            placeholder="6文字以上"
            value={value}
            onChange={onChange}
          />
        </Box>
        <Box textAlign="center" mx={2}>
          <FlexibleButton
            onClick={onClick}
            variant="contained"
            color="primary"
            label="Login"
          />
        </Box>
      </Paper>
    </div>
  );
};
