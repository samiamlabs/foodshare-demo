// @flow

import * as React from 'react';
import Reboot from 'material-ui/Reboot';

import {withStyles} from 'material-ui/styles';
import {AppBar, Typography, Toolbar} from 'material-ui';

import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import MyLocationIcon from 'material-ui-icons/MyLocation';
import CartIcon from 'material-ui-icons/ShoppingCart';
import Badge from 'material-ui/Badge';
import Menu, {MenuItem} from 'material-ui/Menu';

import AddressAutoComplete from './AddressAutoComplete';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  locationButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class SimpleAppBar extends React.Component<{}> {
  state = {
    anchorEl: null,
    addressBarOpen: false,
    addressTitle: 'Alsättersgatan 36',
    address: 'Alsättersgatan 36, Linköping, Sweden'
  };

  handleCartClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleMyPositionClick = event => {
    this.setState({addressBarOpen: true});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  handleAddressSubmit = address => {
    const addressArray = address.split(',');
    this.setState({
      addressBarOpen: false,
      addressTitle: addressArray[0],
      address
    });
  };

  render() {
    const {classes} = this.props;
    const {anchorEl} = this.state;


    const cartWithBadge = (
      <Badge badgeContent={this.props.cart.length} color="secondary">
        <CartIcon />
      </Badge>
    );

    const cartWithoutBadge = <CartIcon />;

    const cart = this.props.cart.length > 0 ? cartWithBadge : cartWithoutBadge;

    return (
      <div className={classes.root}>
        <Reboot />
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <IconButton
              className={classes.locationButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.handleMyPositionClick}
            >
              <MyLocationIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              {this.state.addressTitle}
            </Typography>
            <IconButton
              color="inherit"
              aria-label="Cart"
              onClick={this.handleCartClick}
            >
              {cart}
            </IconButton>
          </Toolbar>
          {this.state.addressBarOpen && (
            <AddressAutoComplete
              handleAddressSubmit={this.handleAddressSubmit}
              defaultAddress={this.state.address}
            />
          )}
        </AppBar>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>
            <Typography variant="headline">Cart</Typography>
          </MenuItem>
          {this.props.cart.map(cartItem => (
            <MenuItem key={cartItem} onClick={this.handleClose}>
              <Typography>{cartItem}</Typography>
            </MenuItem>
          ))}
          <MenuItem onClick={this.handleClose}>
            <Button color="secondary" variant="raised">
              Send order
            </Button>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(SimpleAppBar);
