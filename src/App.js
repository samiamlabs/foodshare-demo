// @flow

import * as React from 'react';
import Reboot from 'material-ui/Reboot';
import {withStyles} from 'material-ui/styles';

import './App.css';

import SimpleAppBar from './js/components/SimpleAppBar';
import SortedFoodPlacesList from './js/components/SortedFoodPlacesList';

import Grid from 'material-ui/Grid';

import BottomNavigation, {
  BottomNavigationAction
} from 'material-ui/BottomNavigation';

// import RestoreIcon from 'material-ui-icons/Restore';
// import FavoriteIcon from 'material-ui-icons/Favorite';
// import LocationOnIcon from 'material-ui-icons/LocationOn';

import HomeIcon from 'material-ui-icons/Home';
import ReceiptIcon from 'material-ui-icons/Receipt';
import PersonIcon from 'material-ui-icons/Person';

const styles = theme => ({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  backDrop: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey[200]
  },
  behindAppBar: {
    height: '60px'
  },
  behindBottomNavigation: {
    height: '60px'
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

    return (
      <div className="App">
        <Reboot />
        <SimpleAppBar />
        <div className={classes.behindAppBar} />
        <div className={classes.backDrop}>
          <SortedFoodPlacesList />
          <SortedFoodPlacesList />
        </div>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          className={classes.root}
        >
          <BottomNavigationAction label="Food" icon={<HomeIcon />} />
          <BottomNavigationAction label="Orders" icon={<ReceiptIcon />} />
          <BottomNavigationAction label="Account" icon={<PersonIcon />} />
        </BottomNavigation>
        <div className={classes.behindBottomNavigation} />
      </div>
    );
  }
}

export default withStyles(styles)(App);