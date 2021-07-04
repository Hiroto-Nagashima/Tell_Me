import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import { TextField, StyledButton } from '../../atoms';

const useStyles = makeStyles(() =>
  createStyles({
    cover: {
      width: 80,
      height: 80,
      objectFit: 'cover',
      borderRadius: 80,
      margin: 20,
    },
  }),
);

const Content = styled(CardContent)`
  flex: 1 0 auto;
  display: flex;
  justify-content: space-between;
`;

const Controls = styled.div`
  display: flex;
  width: 95%;
  height: 100px;
  align-items: center;
  justify-content: flex-end;
`;

const Details = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const MyCard = styled(Card)`
  width: 100%;
  height: 250px;
  display: flex;
  border-radius: 20px;
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
    <MyCard>
      <CardMedia
        className={classes.cover}
        image={src}
        component="img"
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
          (e.currentTarget.src =
            'https://d2hmx91pr90hgc.cloudfront.net/noimage.jpeg')
        }
      />
      <Details>
        <Content>
          <TextField
            row={6}
            label="連絡の投稿(100字以内)"
            variant="standard"
            value={value}
            multiline={true}
            onChange={onChangePostContent}
          />
        </Content>
        <Controls>
          <div>
            <StyledButton
              variant="contained"
              onClick={onClickPost}
              label="投稿"
              fontSize={17}
              width={100}
              borderRadius={20}
            />
          </div>
        </Controls>
      </Details>
    </MyCard>
  );
};
