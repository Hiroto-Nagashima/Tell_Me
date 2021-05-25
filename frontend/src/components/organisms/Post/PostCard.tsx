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
  title: string;
  content: string;
  created_at: string;
  IsExpanded: boolean;
  onClickExpand: () => void;
};

export const PostCard: React.FC<Props> = (props) => {
  const { title, content, created_at } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title={title}
        subheader={created_at}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};
