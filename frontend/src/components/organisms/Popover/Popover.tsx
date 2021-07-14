import React from 'react';
import styled from 'styled-components';

import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import Typography from '@material-ui/core/Typography';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from '../../../helper/firebaseAuthHelper';

const Wrapper = styled.div`
  padding: 15px;
`;

export type Props = {
  topText: string | null;
  bottomText: string | null;
  buttonLabel: string | null;
};

export const MyPopover: React.FC<Props> = (props) => {
  const { topText, bottomText, buttonLabel } = props;

  const [user] = useAuthState(getAuth());

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const open = Boolean(anchorEl);

  const id = open ? 'simple-popover' : undefined;

  const onClickButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseAnchor = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button variant="text" color="inherit" onClick={onClickButton}>
        {buttonLabel}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onCloseAnchor}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Wrapper>
          <Box mt={1} display="flex" alignItems="center">
            {user ? (
              <Box mr={4} mb={2}>
                <PhoneIcon />
              </Box>
            ) : (
              <Box mr={2}>Email</Box>
            )}

            <Typography
              align="center"
              color="textSecondary"
              variant="h6"
              component="h6"
            >
              {topText}
            </Typography>
          </Box>
          <Box mt={1} display="flex" alignItems="center">
            {user ? (
              <Box mr={4}>
                <MailIcon />
              </Box>
            ) : (
              <Box mr={2}>Password</Box>
            )}

            <Typography
              align="center"
              color="textSecondary"
              variant="h6"
              component="h6"
            >
              {bottomText}
            </Typography>
          </Box>
        </Wrapper>
      </Popover>
    </div>
  );
};
