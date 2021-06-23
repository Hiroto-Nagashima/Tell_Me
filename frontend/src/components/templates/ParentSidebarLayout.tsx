import React, { ReactNode, useContext, useState } from 'react';
import firebase from 'firebase';
import { useHistory } from 'react-router';

import { Box } from '@material-ui/core';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import ListItem from '@material-ui/core/ListItem';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import { Header } from '../organisms';
import { DraggableDialog } from '../molecules';
import { CurrentKidContext } from '../../providers/KidProvider';
import { Kid } from '../../types/frontend/kid';
import { CurrentUserContext } from '../../providers/UserProvider';
import { CurrentUser } from '../../types/frontend/currentUser';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

type Props = {
  children: ReactNode;
  title: string;
  window?: () => Window;
};

export const ParentSidebarLayout: React.FC<Props> = (props) => {
  const { window, children, title } = props;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const history = useHistory();

  const theme = useTheme();
  const classes = useStyles();

  const [isOpen, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { currentKid, setCurrentKid } = useContext(CurrentKidContext);
  const { setCurrentUser } = useContext(CurrentUserContext);

  const onClickLogoutModalOpen = () => {
    setOpen(true);
  };

  const onClickLogoutModalClose = () => {
    setOpen(false);
  };

  const onToggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const onClickHome = () => {
    history.push(`/kids/${currentKid.id}`);
  };

  const onClickNotebook = () => {
    history.push(`/kids/${currentKid.id}/notebook`);
  };

  const onClickAnnouncement = () => {
    history.push(`/daycares/${currentKid.daycareId}/announcement`);
  };

  const logout = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        history.push('/');
        setCurrentKid({} as Kid);
        setCurrentUser({} as CurrentUser);
      })
      .catch((e) => alert(e));
  };

  const drawer = (
    <>
      <Box textAlign="center">
        <h2>Tell Me</h2>
      </Box>
      <List>
        <ListItem button onClick={onClickHome}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </List>
      <List>
        <ListItem button onClick={onClickNotebook}>
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText primary="Notebook" />
        </ListItem>
      </List>
      <List>
        <ListItem button onClick={onClickAnnouncement}>
          <ListItemIcon>
            <AnnouncementIcon />
          </ListItemIcon>
          <ListItemText primary="Announcement" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={onClickLogoutModalOpen}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </>
  );

  return (
    <div className={classes.root}>
      <Header
        title={title}
        appBarClassName={classes.appBar}
        iconButtonClassName={classes.menuButton}
        onClickTitle={onToggleDrawer}
      />
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={onToggleDrawer}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
      <DraggableDialog
        isOpen={isOpen}
        okLabel="ログアウト"
        content="本当にログアウトしますか？"
        onClickClose={onClickLogoutModalClose}
        onClickOK={() => logout()}
      />
    </div>
  );
};
