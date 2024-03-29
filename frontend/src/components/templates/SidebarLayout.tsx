import React, { ReactNode, useContext, useState } from 'react';
import firebase from 'firebase';
import { useHistory } from 'react-router';
import { Kid } from '../../types/frontend/kid';
import { CurrentUser } from '../../types/frontend/currentUser';
import { CurrentKidContext } from '../../providers/KidProvider';
import { CurrentUserContext } from '../../providers/UserProvider';

import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import { Drawer as CommonDrawer } from './Drawer';
import { Header, DraggableDialog } from '../organisms';

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

export const SidebarLayout: React.FC<Props> = (props) => {
  const { window, children, title } = props;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const classes = useStyles();

  const theme = useTheme();
  const history = useHistory();

  const [isOpen, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { currentKid, setCurrentKid } = useContext(CurrentKidContext);

  const onClickLogoutModalOpen = () => {
    setOpen(true);
  };

  const onClickLogoutModalClose = () => {
    setOpen(false);
  };

  const onToggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const onClickParentHome = () => {
    history.push(`/kids/${currentKid.id}`);
  };

  const onClickNotebook = () => {
    history.push(`/kids/${currentKid.id}/notebook`);
  };

  const onClickParentAnnouncement = () => {
    history.push(`/daycares/${currentKid.daycareId}/announcement`);
  };

  const onClickTeacherHome = () => {
    history.push(
      `/daycares/${currentUser.daycareId}/teachers/${currentUser.id}`,
    );
  };

  const onClickAllKids = () => {
    history.push(`/daycares/${currentUser.daycareId}/kids`);
  };

  const onClickTeacherAnnouncement = () => {
    history.push(
      `/daycares/${currentUser.daycareId}/teachers/${currentUser.id}/announcement`,
    );
  };

  const Logout = async () => {
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
            open={mobileOpen}
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            variant="temporary"
            container={container}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
            onClose={onToggleDrawer}
          >
            {currentUser.role == '保護者' ? (
              <CommonDrawer
                firstListItemText="Home"
                secondListItemText="Notebook"
                thirdListItemText="Announcement"
                onClickFirstItem={onClickParentHome}
                onClickSecondItem={onClickNotebook}
                onClickThirdItem={onClickParentAnnouncement}
                onClickLogoutButton={onClickLogoutModalOpen}
              />
            ) : (
              <CommonDrawer
                firstListItemText="Home"
                secondListItemText="All Kids"
                thirdListItemText="Announcement"
                onClickFirstItem={onClickTeacherHome}
                onClickSecondItem={onClickAllKids}
                onClickThirdItem={onClickTeacherAnnouncement}
                onClickLogoutButton={onClickLogoutModalOpen}
              />
            )}
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
            {currentUser.role == '保護者' ? (
              <CommonDrawer
                firstListItemText="Home"
                secondListItemText="Notebook"
                thirdListItemText="Announcement"
                onClickFirstItem={onClickParentHome}
                onClickSecondItem={onClickNotebook}
                onClickThirdItem={onClickParentAnnouncement}
                onClickLogoutButton={onClickLogoutModalOpen}
              />
            ) : (
              <CommonDrawer
                firstListItemText="Home"
                secondListItemText="All Kids"
                thirdListItemText="Announcement"
                onClickFirstItem={onClickTeacherHome}
                onClickSecondItem={onClickAllKids}
                onClickThirdItem={onClickTeacherAnnouncement}
                onClickLogoutButton={onClickLogoutModalOpen}
              />
            )}
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
        onClickOK={Logout}
        onClickClose={onClickLogoutModalClose}
      />
    </div>
  );
};
