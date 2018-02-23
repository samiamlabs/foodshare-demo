import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classnames from 'classnames';
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions
} from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import StarIcon from 'material-ui-icons/Star';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import Snackbar from 'material-ui/Snackbar';
import CloseIcon from 'material-ui-icons/Close';

// import SortedPlacesActions from '../actions/SortedPlacesActions';
// import SortedPlacesStore from '../stores/SortedPlacesStore';

import Fade from 'material-ui/transitions/Fade';

import Meal from './Meal';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit
  },
  paper: {
    backgroundColor: theme.palette.grey[50],
    padding: theme.spacing.unit
  },
  titlePaper: {
    width: '100%'
    // backgroundColor: theme.palette.primary.light
  },
  listTitle: {
    display: 'flex'
  },
  card: {},
  cardGrid: {
    [theme.breakpoints.down('xs')]: {
      width: '99.5%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '400px'
    }
  },
  media: {
    height: 194
  },
  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  starButton: {
    display: 'flex',
    direction: 'column'
  },
  moreButton: {
    margin: theme.spacing.unit
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  },
  timeDistance: {
    margin: '0px'
  },
  snackBar: {
    bottom: 55
  }
});

class SortedPlaces extends React.Component {
  state = {expanded: false, checked: [], open: false};

  addOns: {name: string, price: number} = [
    {name: 'Fries', price: 20},
    {name: 'Soda', price: 15},
    {name: 'Dip', price: 4}
  ];
  selectedAddOns: Array<boolean> = [false, false, true];

  numberOfMeals: number = 1;
  priceOfMeal: number = 48;

  getTotalPrice = (): number => {
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

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({open: false});
  };

  handleAddOnToggle = (index: number) => {
    console.log(index)
  };

  handleAddToCartClick = () => {
    console.log(`Order: ${this.numberOfMeals} meals, price: ${this.getTotalPrice()}`);
  };

  handleIncreaseMealNumber = () => {
    console.log('increase')
  }

  handleDecreaseMealNumber = () => {
    console.log('decrease')
  }

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
          onClose={this.handleClose}
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

    const foodSelectionPanels = (
      <div className={classes.foodSelectionPanels}>
        <Meal
          addOns={this.addOns}
          selectedAddOns={this.selectedAddOns}
          numberOfMeals={this.numberOfMeals}
          totalPrice={this.getTotalPrice()}
          specialInstructionsText={'Infinate garlic'}
          handleAddOnToggle={this.handleAddOnToggle}
          handleAddToCartClick={this.handleAddToCartClick}
          handleIncreaseMealNumber={this.handleIncreaseMealNumber}
          handleDecreaseMealNumber={this.handleDecreaseMealNumber}
        />
      </div>
    );

    const card1 = (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <div>
              <IconButton className={classes.starButton}>
                <StarIcon color="secondary" />
              </IconButton>
              <Typography>4.7</Typography>
            </div>
          }
          title="Roberts home cooking"
          subheader="Potluck"
        />
        <CardMedia
          className={classes.media}
          image="https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg"
          title="Contemplative Reptile"
        />
        <Grid
          container
          alignItems="center"
          justify="space-around"
          direction="row"
          className={classes.timeDistance}
        >
          <Grid item>
            <IconButton>
              <Icon>timer</Icon>
            </IconButton>
            <Typography variant="caption">20 - 50 minutes</Typography>
          </Grid>
          <Grid item>
            <IconButton>
              <Icon>place</Icon>
            </IconButton>
            <Typography variant="caption">500 meters</Typography>
          </Grid>
        </Grid>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={true} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph variant="body2">
              Meals
            </Typography>
            {foodSelectionPanels}
          </CardContent>
        </Collapse>
      </Card>
    );

    const card2 = card1;

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
              {card1}
            </Grid>
            <Grid item className={classes.cardGrid}>
              {card2}
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
