import React, { ReactNode, useContext, useState } from 'react';
import firebase from 'firebase';
import { useHistory } from 'react-router';
import { CurrentUserContext } from '../../providers/UserProvider';

import { Box } from '@material-ui/core';
import List from '@material-ui/core/List';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import HomeIcon from '@material-ui/icons/Home';
import CssBaseline from '@material-ui/core/CssBaseline';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import { DraggableDialog } from '../molecules';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import { Header } from '../organisms';

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
  window?: () => Window;
};

export const TeacherSidebarLayout: React.FC<Props> = (props) => {
  const { window, children } = props;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const classes = useStyles();

  const theme = useTheme();
  const history = useHistory();

  const [title, setTitle] = useState('Home');
  const [isOpen, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { currentUser } = useContext(CurrentUserContext);

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
    history.push(
      `/daycares/${currentUser.daycareId}/teachers/${currentUser.id}`,
    );
    setTitle('Home');
  };

  const onClickAllKids = () => {
    history.push(`/daycares/${currentUser.daycareId}/all-kids`);
    setTitle('All Kids');
  };

  const onClickAnnouncement = () => {
    history.push(
      `/daycares/${currentUser.daycareId}/teachers/${currentUser.id}/announcement`,
    );
    setTitle('Announcement');
  };

  const logout = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => history.push('/'))
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
        <ListItem button onClick={onClickAllKids}>
          <ListItemIcon>
            <ChildCareIcon />
          </ListItemIcon>
          <ListItemText primary="All Kids" />
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
      <CssBaseline />
      <Header
        title={title}
        appBarClassName={classes.appBar}
        iconButtonClassName={classes.menuButton}
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
