import React, { ReactNode, useContext, useState } from 'react';
import firebase from 'firebase';
import { useHistory } from 'react-router';
import { Kid } from '../../types/frontend/kid';
import { CurrentUser } from '../../types/frontend/currentUser';
import { CurrentKidContext } from '../../providers/KidProvider';
import { CurrentUserContext } from '../../providers/UserProvider';

import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import { Header } from '../organisms';
import { DraggableDialog } from '../molecules';
import { Drawer as CommonDrawer } from './Drawer';

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

  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();

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
            <CommonDrawer
              firstListItemText="Home"
              secondListItemText="Notebook"
              thirdListItemText="Announcement"
              onClickFirstItem={onClickHome}
              onClickSecondItem={onClickNotebook}
              onClickThirdItem={onClickAnnouncement}
              onClickLogoutButton={onClickLogoutModalOpen}
            />
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
            <CommonDrawer
              firstListItemText="Home"
              secondListItemText="Notebook"
              thirdListItemText="Announcement"
              onClickFirstItem={onClickHome}
              onClickSecondItem={onClickNotebook}
              onClickThirdItem={onClickAnnouncement}
              onClickLogoutButton={onClickLogoutModalOpen}
            />
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
