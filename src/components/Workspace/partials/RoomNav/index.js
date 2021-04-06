// Imports
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Component
import AvatarPreview from '../AvatarPreview';

// Material-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import MoreIcon from '@material-ui/icons/MoreVert';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Tooltip from '@material-ui/core/Tooltip';
import Skeleton from '@material-ui/lab/Skeleton';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: props => ({
    top: '57px',
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${props.xOffSet}px)`,
      marginLeft: props.xOffSet,
    },
  }),
  inputRoot: {
    color: 'inherit',
    textDecoration: "none",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const RoomNav = (props) => {
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  if (props.isLoadingRoom) {
    return (
      <div className={classes.grow}>
        <AppBar className={classes.appBar} color="default" position="fixed">
          <Toolbar>
            <Skeleton className="w-100" variant="rect" height={68} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <NavLink className={classes.inputRoot} to="/">
          Home
        </NavLink>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={props.handleLogout}>Logout</MenuItem>
    </Menu>
  );


  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <AvatarPreview members={props.room.members} message="Members" />
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="new person" color="inherit">
            <PersonAddIcon />
        </IconButton>
        <p>Add Member(s) To Room</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show Tasks" color="inherit">
          <Badge badgeContent={0} color="secondary">
            <AssignmentLateIcon />
          </Badge>
        </IconButton>
        <p>Tasks</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appBar} color="default" position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap>
            { props.room.name }
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Tooltip title="View All Members" aria-label="add">
              <div>
                <AvatarPreview members={props.room.members} message="Members" />
              </div>
            </Tooltip>
            <Tooltip title="Add Member(s) to Room" aria-label="add">
              <IconButton aria-label="new person" color="inherit">
                <PersonAddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Tasks" aria-label="add">
              <IconButton aria-label="show new Tasks" color="inherit">
                <Badge badgeContent={props.room.tasks.length} color="secondary">
                  <AssignmentLateIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export default RoomNav