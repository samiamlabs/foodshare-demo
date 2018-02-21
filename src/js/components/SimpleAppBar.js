// @flow

import * as React from 'react';
import Reboot from 'material-ui/Reboot';

import {withStyles} from 'material-ui/styles';
import {AppBar, Typography, Toolbar} from 'material-ui';

import IconButton from 'material-ui/IconButton';
import LocationIcon from 'material-ui-icons/MyLocation';
import CartIcon from 'material-ui-icons/ShoppingCart';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1,
  },
  locationButton: {
    marginLeft: -12,
    marginRight: 20
  },
};

class SimpleAppBar extends React.Component<{}> {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <Reboot />
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <IconButton
              className={classes.locationButton}
              color="inherit"
              aria-label="Menu"
            >
              <LocationIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Alsättersgatan 36
            </Typography>
            <IconButton color="inherit" aria-label="Cart">
              <CartIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(SimpleAppBar);
