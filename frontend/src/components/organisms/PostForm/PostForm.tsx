import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import { MultipleLinesTextField, StyledButton } from '../../atoms';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      width: 560,
      borderRadius: 20,
      height: 240,
      padding: 20,
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      width: 400,
    },
    content: {
      flex: '1 0 auto',
      display: 'flex',
      justifyContent: 'space-between',
    },
    cover: {
      width: 80,
      height: 80,
      objectFit: 'cover',
      borderRadius: 80,
      margin: 20,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      width: 380,
      justifyContent: 'flex-end',
    },
  }),
);

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
`;

export type Props = {
  src: string;
  value: string | null;
  onClickPost: () => void;
  onChangePostContent: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const PostForm: React.FC<Props> = (props) => {
  const { src, value, onChangePostContent, onClickPost } = props;

  const classes = useStyles();

  return (
    <FlexBox>
      <div>
        <Card className={classes.root}>
          <CardMedia
            className={classes.cover}
            image={src}
            component="img"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
              (e.currentTarget.src =
                'https://d2hmx91pr90hgc.cloudfront.net/noimage.jpeg')
            }
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <MultipleLinesTextField
                label="Announcement"
                variant="standard"
                value={value}
                onChange={onChangePostContent}
                row={5}
              />
            </CardContent>
            <div className={classes.controls}>
              <div>
                <StyledButton
                  variant="contained"
                  onClick={onClickPost}
                  label="登録"
                  fontSize={17}
                  width={100}
                  borderRadius={20}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </FlexBox>
  );
};
