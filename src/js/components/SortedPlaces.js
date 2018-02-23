import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Snackbar from 'material-ui/Snackbar';
import CloseIcon from 'material-ui-icons/Close';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

// import SortedPlacesActions from '../actions/SortedPlacesActions';
// import SortedPlacesStore from '../stores/SortedPlacesStore';

import Fade from 'material-ui/transitions/Fade';

import Place from './Place';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit
  },
  titlePaper: {
    width: '100%'
  },
  listTitle: {
    display: 'flex'
  },
  paper: {
    backgroundColor: theme.palette.grey[50],
    padding: theme.spacing.unit
  },
  cardGrid: {
    [theme.breakpoints.down('xs')]: {
      width: '99.5%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '400px'
    }
  },
  moreButton: {
    margin: theme.spacing.unit
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  },
  snackBar: {
    bottom: 55
  }
});

class SortedPlaces extends React.Component {
  state = {expanded: false, open: false};

  specialInstructionsText: string = "Lots of garlic";
  mealExpanded: boolean = true;

  addOns: {name: string, price: number} = [
    {name: 'Fries', price: 20},
    {name: 'Soda', price: 15},
    {name: 'Dip', price: 4}
  ];
  selectedAddOns: Array<boolean> = [false, false, true];

  numberOfMeals: number = 2;
  priceOfMeal: number = 48;

  getTotalPrice = () => {
    let sumOfAddOns: number = 0;
    this.addOns.forEach(
      (addOn: {name: string, price: number}, index: number) => {
        if (this.selectedAddOns[index]) {
          sumOfAddOns += addOn.price;
        }
      }
    );

    const totalPrice: number =
      this.numberOfMeals * (this.priceOfMeal + sumOfAddOns);
    return totalPrice;
  };

  handleExpandClick = () => {
    this.setState({expanded: !this.state.expanded});
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({open: false});
  };

  handleAddOnToggle = (index: number) => {
    console.log(index);
  };

  handleAddToCartClick = () => {
    console.log(
      `Order: ${this.numberOfMeals} meals, price: ${this.getTotalPrice()}`
    );
  };

  handleIncreaseMealNumber = () => {
    console.log('increase');
  };

  handleDecreaseMealNumber = () => {
    console.log('decrease');
  };

  render() {
    const {classes} = this.props;

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
      <div className={classes.root}>
        {snackBar}
        <Paper className={classes.paper}>
          <Grid container alignItems="center" justify="center" direciton="row">
            <Grid className={classes.titlePaper} item>
              <Typography variant="title">Under 30 minutes</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={16}>
            <Grid item className={classes.cardGrid}>
              <Place
                expanded={this.state.expanded}
                mealExpanded={this.mealExpanded}
                numberOfMeals={this.numberOfMeals}
                addOns={this.addOns}
                selectedAddOns={this.selectedAddOns}
                totalPrice={this.getTotalPrice()}
                handleExpandClick={this.handleExpandClick}
                handleAddOnToggle={this.handleAddOnToggle}
                handleAddToCartClick={this.handleAddToCartClick}
                handleIncreaseMealNumber={this.handleIncreaseMealNumber}
                handleDecreaseMealNumber={this.handleDecreaseMealNumber}
              />
            </Grid>
            <Grid item className={classes.cardGrid}>
              <Place />
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="flex-end"
            justify="flex-end"
            direction="row"
          >
            <Grid item>
              <Button color="primary" className={classes.moreButton}>
                MORE
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

SortedPlaces.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SortedPlaces);
