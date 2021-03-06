import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import styled from 'styled-components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: 20,
    },
    header: {
      fontSize: 300,
    },
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  }),
);

const Content = styled(Box)`
  padding: 0 16px 16px 16px;
`;

export type Props = {
  poster: string;
  content: string;
  teacherId: number;
  createdAt: Date | string;
};

export const PostCard: React.FC<Props> = (props) => {
  const { poster, teacherId, content, createdAt } = props;

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            className={classes.large}
            src={`https://d2hmx91pr90hgc.cloudfront.net/uploads/user/image/${teacherId}/image.jpeg`}
          />
        }
        titleTypographyProps={{ variant: 'h6' }}
        title={poster}
        subheader={createdAt}
      />
      <Content>
        <Typography variant="body1">{content}</Typography>
      </Content>
    </Card>
  );
};
