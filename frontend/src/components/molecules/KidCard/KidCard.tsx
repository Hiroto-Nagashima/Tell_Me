import React from 'react';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { StyledButton } from '../../atoms';
import styled from 'styled-components';

const useStyles = makeStyles(() =>
  createStyles({
    cover: {
      width: 120,
      height: 120,
      objectFit: 'cover',
      borderRadius: 60,
      marginRight: 15,
      marginLeft: 15,
      marginTop: 15,
    },
  }),
);

const Content = styled(CardContent)`
  margin-top: 50px;
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
  height: 200px;
  display: flex;
  border-radius: 20px;
`;

export type Props = {
  kidName: string | null;
  age: number | null;
  src: string;
  onClick?: () => void;
};

export const KidCard: React.FC<Props> = (props) => {
  const { kidName, age, src, onClick } = props;
  const classes = useStyles();

  return (
    <MyCard>
      <CardMedia
        className={classes.cover}
        src={src}
        component="img"
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
          (e.currentTarget.src =
            'https://d2hmx91pr90hgc.cloudfront.net/noimage.jpeg')
        }
      />
      <Details>
        <Content>
          <Typography component="h4" variant="h4">
            {kidName}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {age}さい
          </Typography>
        </Content>
        <Controls>
          <CardActions>
            <StyledButton
              variant="contained"
              onClick={onClick}
              label="決定"
              fontSize={18}
              width={100}
              borderRadius={20}
            />
          </CardActions>
        </Controls>
      </Details>
    </MyCard>
  );
};
