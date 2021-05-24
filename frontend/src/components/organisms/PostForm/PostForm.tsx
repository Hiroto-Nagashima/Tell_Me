import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { MultipleLinesTextField } from '../../atoms';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      width: 450,
      borderRadius: 20,
      height: 160,
      padding: 20,
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      width: 280,
    },
    content: {
      marginTop: 50,
      flex: '1 0 auto',
      display: 'flex',
      justifyContent: 'space-between',
    },
    cover: {
      width: 80,
      height: 80,
      objectFit: 'cover',
      borderRadius: 80,
      marginRight: 5,
      marginLeft: 5,
      onerror: 'this.src=`${process.env.PUBLIC_URL}/noimage.jpeg`',
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: 5670,
    },
  }),
);

export type Props = {
  src: string;
  onClick?: () => void;
};

export const PostForm: React.FC<Props> = (props) => {
  const { src, onClick } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={src}
        title="post announcement"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <MultipleLinesTextField
            label="Announcement"
            variant="standard"
            row={3}
          />
        </CardContent>
        <div className={classes.controls}>
          <CardActions>
            <Button
              size="large"
              color="primary"
              variant="contained"
              onClick={onClick}
            >
              投稿
            </Button>
          </CardActions>
        </div>
      </div>
    </Card>
  );
};
