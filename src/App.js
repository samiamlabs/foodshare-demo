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

import AppStore from './js/stores/AppStore';

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
    value: 0,
    open: false,
    underThirtyExpanded: false,
    moreExpanded: false,
    closeExpanded: false,
    badgeContent: 0
  };

  componentWillMount() {
    AppStore.on('openSnackBar', this.openSnackBar);
  }

  componentWillunount() {
    AppStore.removeListener('openSnackBar', this.openSnackBar);
  }

  handleMoreClick = (title: string, event) => {
    switch (title) {
      case 'Under 30 minutes': {
        this.setState({underThirtyExpanded: !this.state.underThirtyExpanded});
        break;
      }

      case 'Close to you': {
        this.setState({closeExpanded: !this.state.closeExpanded});
        break;
      }
      case 'More places': {
        this.setState({moreExpanded: !this.state.moreExpanded});
        break;
      }
      default:
      // Do nothing
    }
  };

  handleChange = (event, value) => {
    this.setState({value});
    window.scrollTo(0, 0);
  };

  openSnackBar = () => {
    this.setState({open: true, badgeContent: this.state.badgeContent + 1});
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({open: false});
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
          message={<span id="message-id">{AppStore.getSnackBarMessage()}</span>}
          action={[
            <Button
              key="undo"
              color="secondary"
              size="small"
              onClick={this.handleSnackbarClose}
            >
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleSnackbarClose}
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
        <SimpleAppBar badgeContent={this.state.badgeContent} cart={AppStore.getCart()}/>
        <div className={classes.behindAppBar} />
        <div className={classes.backDrop}>
          <SortedPlaces
            handleMoreClick={this.handleMoreClick}
            underThirtyExpanded={this.state.underThirtyExpanded}
            closeExpanded={this.state.closeExpanded}
            moreExpanded={this.state.moreExpanded}
          />
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
