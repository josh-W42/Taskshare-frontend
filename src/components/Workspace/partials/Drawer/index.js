// Imports
import { useEffect, useState } from "react";
import { Route, Switch as RouterSwitch } from "react-router";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

// Components
import SearchBar from "../SearchBar";
import PostContainer from "../PostContainer";
import NavAvatar from "../NavAvatar";
import PostView from "../PostView";
import LightDarkSwitch from "../../../partials/LightDarkSwitch";

// Material-Ui
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import NestedNavList from "../NestedNavList";
import GroupIcon from "@material-ui/icons/Group";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from '@material-ui/core/ListItem';
import QuestionAnswerSharpIcon from '@material-ui/icons/QuestionAnswerSharp';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Badge from '@material-ui/core/Badge';
import Skeleton from '@material-ui/lab/Skeleton';
import AddIcon from '@material-ui/icons/Add';
import { Button } from "@material-ui/core";
import RoomDialog from "../RoomDialog";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    height: "100%",
    flexGrow: 1,
  },
  nested: {
    paddingLeft: theme.spacing(4),
    width: '100%',
  },
  link: {
    color: "inherit",
    width: '100%',
    '&:hover': {
      color: "inherit"
    },
  },
}));

const ResponsiveDrawer = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [rooms, setRooms] = useState([1, 2, 3, 4]);
  const [directMessages, setDirectMessages] = useState([1, 2, 3, 4]);

  useEffect(() => {
    // wait until workspace and member data finfishes loading
    if (!props.isLoadingWorkspace) {
      // set the rooms the member is in
      sortRooms();
    }
  }, [props.isLoadingWorkspace])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sortRooms = () => {
    const roomObject = props.member.rooms;
    const messages = [];
    const rooms = [];
    for (const id in roomObject) {
      const room = roomObject[id];
      room.id = id;
      if (roomObject[id].isAMessageRoom) {
        messages.push(room);
      } else {        
        rooms.push(room);
      }
    }
    setRooms(rooms);
    setDirectMessages(messages);
  }



  const roomArray = rooms.map((room, index) => {

    if (props.isLoadingWorkspace) {
      return (
        <ListItem key={`room-${index}`} button className={classes.nested}>
          <Skeleton variant="rect" width={200} height={25} />
        </ListItem>
      );
    }
    return (
      <ListItem key={`room-${index}`} button className={classes.nested}>
        <NavLink className={classes.link} to={`/workspaces/${props.workspace._id}/rooms/${room.id}`} >
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <ListItemIcon>
                <Badge badgeContent={room.newNotifications ? room.newNotifications : 0} color="secondary">
                  {
                    room.isPrivate ? (
                      <VisibilityOffIcon />
                    ) : (
                      <QuestionAnswerSharpIcon />
                    )
                  }
                </Badge>
              </ListItemIcon>
            </Grid>
            <Grid item >
              <ListItemText primary={room.name} />
            </Grid>
          </Grid>
        </NavLink>
      </ListItem>
    );
  });

  const dmArray = directMessages.map((messageRoom, index) => {

    if (props.isLoadingWorkspace) {
      return (
        <ListItem key={`room-${index}`} button className={classes.nested}>
          <Skeleton variant="rect" width={200} height={25} />
        </ListItem>
      );
    }    

    return (
      <ListItem key={`messageRoom-${index}`} button className={classes.nested}>
        <ListItemIcon>
          <Badge badgeContent={index + 1} color="secondary">
            <NavAvatar socket={props.socket} member={props.member} />
          </Badge>
          {/* <AvatarGroup max={1}>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar
              alt="Trevor Henderson"
              src="/static/images/avatar/5.jpg"
            />
          </AvatarGroup> */}
        </ListItemIcon>
        <ListItemText primary="User Name" />
      </ListItem>
    );
  });

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Button>
        <LightDarkSwitch
          setDarkModeEnabled={props.setDarkModeEnabled}
          darkModeEnabled={props.darkModeEnabled}
        />
      </Button>
      <Divider />
      { props.isLoadingWorkspace ? (
        <ListItem>
          <Skeleton variant="rect" width={200} height={25} />
        </ListItem>
      ) : (
        <RoomDialog
          permissions={props.member.permissions}
          role={props.member.role}
          workspaceId={props.workspace._id}
          createNotification={props.createNotification}
        />
      )}
      <NestedNavList
        category="Rooms"
        mainIcon={<GroupIcon />}
        listItems={roomArray}
      />
      <Divider />
      <Button className="w-100">
        <AddIcon />
        New Message
      </Button>
      <NestedNavList
        category="Messages"
        mainIcon={<GroupIcon />}
        listItems={dmArray}
      />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;


  return (
    <div className={classes.root}>
      <CssBaseline />
      {
        props.isLoadingWorkspace ? (
          <AppBar color="inherit" position="fixed" className={classes.appBar}>
            <Toolbar>
              <Skeleton className="w-100" variant="rect" height={35} />
            </Toolbar>
          </AppBar>
        ) : (
          <AppBar color="inherit" position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Grid item xs={9} sm={6} md={6}>
                <Typography variant="h6" noWrap>
                  {props.workspace.name}
                </Typography>
              </Grid>
              <Hidden xsDown>
                <Grid item xs={3} sm={6} md={5}>
                  <SearchBar />
                </Grid>
              </Hidden>
              <Hidden smDown>
                <Grid item xs={1}>
                  <NavAvatar socket={props.socket} member={props.member} />
                </Grid>
              </Hidden>
            </Toolbar>
          </AppBar>
        )
      }
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
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
        <RouterSwitch>
          <Route
            path="/workspaces/:wId/rooms/:rId"
            render={(RenderProps) => {
              return (
                <PostContainer
                  {...RenderProps}
                  socket={props.socket}
                  createNotification={props.createNotification}
                  isLoadingData={props.isLoadingData}
                  xOffSet={drawerWidth}
                />
              );
            }}
          />
          <Route
            path="/workspaces/post"
            render={(props) => {
              return <PostView {...props} xOffSet={drawerWidth} />;
            }}
          />
        </RouterSwitch>
      </main>
    </div>
  );
};

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
