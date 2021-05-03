import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Box } from '@material-ui/core';
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
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={8}>
            <Box component="h1" p={2} textAlign="center">
              {title}
            </Box>
          </Grid>
          <Grid item xs={10}>
            <Box textAlign="center" m={4}>
              <SingleLineTextField
                textName="ID"
                placeholder="1 or 2"
                value={value}
                onChange={onChange}
              />
            </Box>
          </Grid>
          <Grid item xs={10}>
            <Box>
              <FlexibleButton
                onClick={onClick}
                variant="contained"
                color="primary"
                label="Login"
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
