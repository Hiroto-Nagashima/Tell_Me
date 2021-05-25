import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: 560,
      borderRadius: 20,
    },
  }),
);

export type Props = {
  poster: string;
  content: string;
  teacherId: number;
  createdAt: Date;
};

export const PostCard: React.FC<Props> = (props) => {
  const { poster, teacherId, content, createdAt } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            src={`https://d2hmx91pr90hgc.cloudfront.net/uploads/user/image/${teacherId}/image.jpeg`}
          />
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
