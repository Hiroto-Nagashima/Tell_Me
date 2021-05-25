import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: 500,
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

export type Props = {
  poster: string;
  content: string;
  createdAt: Date;
};

export const PostCard: React.FC<Props> = (props) => {
  const { poster, content, createdAt } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title={poster}
        subheader={createdAt}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};
