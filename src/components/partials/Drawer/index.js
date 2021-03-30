import { useState } from "react";
import PropTypes from "prop-types";
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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import SearchBar from "../SearchBar";
import PostContainer from "../PostContainer";
import NavAvatar from "../NavAvatar";
import RoomNav from "../RoomNav";
import { Route, Switch as RouterSwitch } from "react-router";
import PostView from "../PostView";
import NestedNavList from "../NestedNavList";
import GroupIcon from "@material-ui/icons/Group";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from '@material-ui/core/ListItem';
import QuestionAnswerSharpIcon from '@material-ui/icons/QuestionAnswerSharp';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Badge from '@material-ui/core/Badge';
import BottomAppBar from "../BottomAppBar";


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
  },
}));

const ResponsiveDrawer = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [rooms, setRooms] = useState([1, 2, 3]);
  const [directMessages, setDirectMessages] = useState([1, 2]);

  const toggleDarkMode = (e) => {
    props.setDarkModeEnabled((prev) => !prev);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const roomArray = rooms.map((room, index) => {
    return (
      <ListItem key={`room-${index}`} button className={classes.nested}>
        <ListItemIcon>          
          <Badge badgeContent={index + 1} color="secondary">
            <QuestionAnswerSharpIcon />
          </Badge>
        </ListItemIcon>
        <ListItemText primary="Room Name" />
      </ListItem>
    );
  });

  const dmArray = directMessages.map((messageRoom, index) => {
    return (
      <ListItem key={`messageRoom-${index}`} button className={classes.nested}>
        <ListItemIcon>
          <Badge badgeContent={index + 1} color="secondary">
            <NavAvatar />
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
      <Divider />
      <NestedNavList
        category="Rooms"
        mainIcon={<GroupIcon />}
        listItems={roomArray}
      />
      <Divider />
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
              WorkSpace Name Here
            </Typography>
          </Grid>
          <Hidden xsDown>
            <Grid item xs={3} sm={6} md={5}>
              <SearchBar />
            </Grid>
          </Hidden>
          <Hidden smDown>
            <Grid item xs={1}>
              <NavAvatar />
            </Grid>
          </Hidden>
        </Toolbar>
      </AppBar>
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
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={props.darkModeEnabled}
                    onChange={toggleDarkMode}
                  />
                }
                label={props.darkModeEnabled ? "Dark" : "Light"}
              />
            </FormGroup>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <RoomNav xOffSet={drawerWidth} />
        <RouterSwitch>
          <Route
            path="/workspaces/rooms"
            render={(props) => {
              return <PostContainer {...props} />;
            }}
          />
          <Route
            path="/workspaces/post"
            render={(props) => {
              return <PostView {...props} />;
            }}
          />
        </RouterSwitch>
        <BottomAppBar xOffSet={drawerWidth} />
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
