import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ProfileImage } from '../atoms/ProfileImage';
import styled from 'styled-components';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: 400,
    position: 'relative',
  },
  media: {
    height: 100,
    backgroundColor: '#3f51b5',
  },
});
const KidNameArea = styled(Typography)`
  font-size: 25px;
`;
const ProfileImageBox = styled(Box)`
  position: absolute;
  right: 100px;
  top: 20px;
`;
const MyCardActions = styled(CardActions)`
  display: flex;
`;

const MyCardActionArea = styled(Box)`
  height: 360px;
`;

const ButtonWrapper = styled(Box)`
  width: 100px;
  margin: 0 0 0 auto;
`;

export const KidProfile: React.FC = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <MyCardActionArea>
        <CardMedia className={classes.media} title="Contemplative Reptile" />
        <CardContent>
          <ProfileImageBox>
            <ProfileImage />
          </ProfileImageBox>
          <Box mt={5}>
            <KidNameArea
              variant="subtitle1"
              color="textSecondary"
              align="center"
            >
              鈴木太郎
            </KidNameArea>
          </Box>
          <Box mt={2}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              component="h2"
            >
              好きな遊び
            </Typography>
          </Box>
          <Box mt={1}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              component="h1"
              align="center"
            >
              サッカー
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              component="h2"
            >
              好きな食べ物
            </Typography>
          </Box>
          <Box mt={1}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              component="h1"
              align="center"
            >
              カレーライス、酢豚
            </Typography>
          </Box>
        </CardContent>
      </MyCardActionArea>
      <MyCardActions>
        <ButtonWrapper>
          <Button size="small" color="primary">
            Update
          </Button>
        </ButtonWrapper>
      </MyCardActions>
    </Card>
  );
};
