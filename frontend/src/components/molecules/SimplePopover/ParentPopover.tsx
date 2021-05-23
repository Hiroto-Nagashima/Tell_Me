import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import PhoneIcon from '@material-ui/icons/Phone';
import Button from '@material-ui/core/Button';
import MailIcon from '@material-ui/icons/Mail';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
  }),
);

export type Props = {
  email: string;
  buttonLabel: string;
  telephoneNumber: string;
};

export const ParentPopover: React.FC<Props> = (props) => {
  const { email, telephoneNumber, buttonLabel } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="text"
        color="inherit"
        onClick={handleClick}
      >
        {buttonLabel}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
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
