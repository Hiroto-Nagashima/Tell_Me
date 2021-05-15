import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { ProfileImage } from '../../atoms/ProfileImage/ProfileImage';

const useStyles = makeStyles({
  root: {
    width: 345,
    height: 440,
    position: 'relative',
  },
  media: {
    height: 100,
    backgroundColor: '#3f51b5',
  },
});
const ParentNameArea = styled(Typography)`
  font-size: 25px;
`;
const ProfileImageBox = styled(Box)`
  position: absolute;
  top: 20px;
`;
const MyCardActions = styled(CardActions)`
  display: flex;
`;

const MyCardActionArea = styled(Box)`
  height: 390px;
`;

const ButtonWrapper = styled(Box)`
  width: 100px;
  margin: 0 0 0 auto;
`;

export type Props = {
  parentName: string | null | undefined;
  email: string | null | undefined;
  telephoneNumber: string | null | undefined;
};

export const ParentProfile: React.FC<Props> = (props) => {
  const { parentName, telephoneNumber, email } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <MyCardActionArea>
        <CardMedia className={classes.media} title="Contemplative Reptile" />
        <CardContent>
          <Box display="flex" justifyContent="center">
            <ProfileImageBox>
              <ProfileImage />
            </ProfileImageBox>
          </Box>
          <Box mt={5}>
            <ParentNameArea variant="subtitle1" color="inherit" align="center">
              {parentName}
            </ParentNameArea>
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle1" color="inherit" component="h2">
              電話番号
            </Typography>
          </Box>
          <Box mt={1}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              component="h1"
              align="center"
            >
              {telephoneNumber}
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle1" color="inherit" component="h2">
              メールアドレス
            </Typography>
          </Box>
          <Box mt={1}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              component="h1"
              align="center"
            >
              {email}
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
