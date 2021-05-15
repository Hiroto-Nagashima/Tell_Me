import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: 450,
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      width: 280,
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 150,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  }),
);
export type Props = {
  kidName: string | null;
  age: number | null;
  onClick?: () => void;
};

export const KidCard: React.FC<Props> = (props) => {
  const { kidName, age, onClick } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={`${process.env.PUBLIC_URL}/noimage.jpeg`}
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {kidName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {age}さい
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <CardActions>
            <Button
              size="large"
              color="primary"
              variant="contained"
              onClick={onClick}
            >
              決定
            </Button>
          </CardActions>
        </div>
      </div>
    </Card>
  );
};