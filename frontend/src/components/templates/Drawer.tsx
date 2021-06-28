import React from 'react';

import { Box } from '@material-ui/core';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import ListItem from '@material-ui/core/ListItem';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AnnouncementIcon from '@material-ui/icons/Announcement';

type Props = {
  onClickFirstItem: () => void;
  onClickSecondItem: () => void;
  onClickThirdItem: () => void;
  onClickLogoutButton: () => void;
  firstListItemText: string;
  secondListItemText: string;
  thirdListItemText: string;
};

export const Drawer: React.FC<Props> = (props) => {
  const {
    onClickFirstItem,
    firstListItemText,
    onClickSecondItem,
    secondListItemText,
    onClickThirdItem,
    thirdListItemText,
    onClickLogoutButton,
  } = props;

  return (
    <>
      <Box textAlign="center">
        <h2>Tell Me</h2>
      </Box>
      <List>
        <ListItem button onClick={onClickFirstItem}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={firstListItemText} />
        </ListItem>
      </List>
      <List>
        <ListItem button onClick={onClickSecondItem}>
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText primary={secondListItemText} />
        </ListItem>
      </List>
      <List>
        <ListItem button onClick={onClickThirdItem}>
          <ListItemIcon>
            <AnnouncementIcon />
          </ListItemIcon>
          <ListItemText primary={thirdListItemText} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={onClickLogoutButton}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </>
  );
};
