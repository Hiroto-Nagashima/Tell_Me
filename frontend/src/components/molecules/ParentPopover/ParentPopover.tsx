import React from 'react';
import { Box } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import PhoneIcon from '@material-ui/icons/Phone';
import Button from '@material-ui/core/Button';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
  }),
);

export type Props = {
  email: string | null;
  buttonLabel: string | null;
  telephoneNumber: string | null;
};

export const ParentPopover: React.FC<Props> = (props) => {
  const { email, telephoneNumber, buttonLabel } = props;

  const classes = useStyles();

  const [anchorEl, setAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

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
        <div className={classes.typography}>
          <Box mt={1} display="flex">
            <Box mr={4} mb={2}>
              <PhoneIcon />
            </Box>
            <Typography
              variant="h6"
              color="textSecondary"
              component="h6"
              align="center"
            >
              {telephoneNumber}
            </Typography>
          </Box>
          <Box mt={1} display="flex">
            <Box mr={4}>
              <MailIcon />
            </Box>
            <Typography
              variant="h6"
              color="textSecondary"
              component="h6"
              align="center"
            >
              {email}
            </Typography>
          </Box>
        </div>
      </Popover>
    </div>
  );
};