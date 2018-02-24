// @flow

import * as React from 'react';
import Reboot from 'material-ui/Reboot';
import {withStyles} from 'material-ui/styles';

import './App.css';

import SimpleAppBar from './js/components/SimpleAppBar';
import SortedPlaces from './js/components/SortedPlaces';

import BottomNavigation, {
  BottomNavigationAction
} from 'material-ui/BottomNavigation';

import Snackbar from 'material-ui/Snackbar';

import HomeIcon from 'material-ui-icons/Home';
import ReceiptIcon from 'material-ui-icons/Receipt';
import PersonIcon from 'material-ui-icons/Person';

import Fade from 'material-ui/transitions/Fade';
import CloseIcon from 'material-ui-icons/Close';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: theme.palette.grey[300]
  },
  backDrop: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey[300]
  },
  behindAppBar: {
    height: '60px',
    backgroundColor: theme.palette.grey[300]
  },
  behindBottomNavigation: {
    height: '60px',
    backgroundColor: theme.palette.grey[300]
  },
  bottomNavigation: {
    position: 'fixed',
    bottom: 0,
    width: '100%'
  },
  snackBar: {
    bottom: 55
  }
});

class App extends React.Component<{}> {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({value});
  };

  render() {
    const {classes} = this.props;
    const {value} = this.state;

    const snackBar = (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          className={classes.snackBar}
          open={this.state.open}
          transition={Fade}
          autoHideDuration={6000}
          onClose={this.handleSnackbarClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">Added 3 items to cart</span>}
          action={[
            <Button
              key="undo"
              color="secondary"
              size="small"
              onClick={this.handleClose}
            >
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );

    return (
      <div className="App">
        <Reboot />
        <SimpleAppBar />
        <div className={classes.behindAppBar} />
        <div className={classes.backDrop}>
          <SortedPlaces />
        </div>
          <BottomNavigation
            className={classes.bottomNavigation}
            value={value}
            onChange={this.handleChange}
          >
            <BottomNavigationAction label="Places" icon={<HomeIcon />} />
            <BottomNavigationAction label="Orders" icon={<ReceiptIcon />} />
            <BottomNavigationAction label="Account" icon={<PersonIcon />} />
          </BottomNavigation>
          {snackBar}
        <div className={classes.behindBottomNavigation} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
