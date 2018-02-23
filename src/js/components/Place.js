import * as React from 'react';
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
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import StarIcon from 'material-ui-icons/Star';
import Icon from 'material-ui/Icon';
import Grid from 'material-ui/Grid';
import red from 'material-ui/colors/red';

import Meal from './Meal';

import PlaceStore from '../stores/PlaceStore';
import PlaceActions from '../actions/PlaceActions';

const styles = theme => ({
  card: {},
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
  timeDistance: {
    margin: '0px'
  }
});

type Props = {
  id: number
};

class Place extends React.Component<Props> {
  state = {store: PlaceStore.getStateById(this.props.id)};

  specialInstructionsText: string = 'Lots of garlic';
  mealExpanded: boolean = true;
  expanded: boolean = true;

  componentWillMount() {
    PlaceStore.on('change', this.getStoreState);
    PlaceActions.getPlaceById(this.props.id);
  }

  getStoreState = () => {
    this.setState({store: PlaceStore.getStateById(this.props.id)});
  };

  getTotalPrice = mealId => {
    const place = this.state.store.get('place');
    const selectedAddOns = this.state.store.get('selectedAddOns');

    let totalPrice = 0;

    place.get('meals').forEach(meal => {
      if (meal.get('_id') === mealId) {
        let sumOfAddOns: number = 0;

        meal.get('add_ons').forEach(addOn => {
          if (selectedAddOns.getIn([meal.get('_id'), addOn.get('_id')])) {
            sumOfAddOns += addOn.get('price');
          }
        });

        const numberOfMeals = this.state.store.getIn([
          'numberOfMeals',
          meal.get('_id')
        ]);

        totalPrice = numberOfMeals * (meal.get('price') + sumOfAddOns);
      }
    });

    return totalPrice;
  };

  getDistance = () => {
    const distance = 3.5;
    //Math.floor(places.getIn([index, 'distance']) / 10) / 100;
    return `${distance} km`;
  };

  getTimeString = () => {
    const minTime = 20; //place.get('wait_time');
    const maxTime = 30; //place.get('wait_time_margin');

    return `${minTime} - ${maxTime} minutes`;
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

  handleAddOnToggle = (mealId: number, addOnId: number) => {
    PlaceActions.toggleAddOn(
      this.state.store.getIn(['place', '_id']),
      addOnId,
      mealId
    );
  };

  handleAddToCartClick = (mealId, event) => {
    console.log(
      `Order: ${this.numberOfMeals} meals, price: ${this.getTotalPrice(mealId)}`
    );
  };

  handleIncreaseMealNumber = (mealId, event) => {
    PlaceActions.increaseNumberOfMeals(
      this.state.store.getIn(['place', '_id']),
      mealId
    );
  };

  handleDecreaseMealNumber = (mealId, event) => {
    PlaceActions.decreaseNumberOfMeals(
      this.state.store.getIn(['place', '_id']),
      mealId
    );
  };

  render() {
    const {classes} = this.props;
    const state = this.state.store;

    const MealPanels = props => {
      const mealList = [];
      state.getIn(['place', 'meals']).forEach(meal => {
        const selectedAddOns = state.getIn(['selectedAddOns', meal.get('_id')]);
        mealList.push(
          <Meal
            key={meal.get('_id')}
            mealState={meal.toJS()}
            selectedAddOns={selectedAddOns.toJS()}
            numberOfMeals={state.getIn(['numberOfMeals', meal.get('_id')])}
            totalPrice={this.getTotalPrice(meal.get('_id'))}
            specialInstructionsText={this.specialInstructionsText}
            expanded={this.mealExpanded}
            handleAddOnToggle={this.handleAddOnToggle}
            handleAddToCartClick={this.handleAddToCartClick}
            handleIncreaseMealNumber={this.handleIncreaseMealNumber}
            handleDecreaseMealNumber={this.handleDecreaseMealNumber}
          />
        );
      });

      return <div className={classes.foodSelectionPanels}>{mealList}</div>;
    };

    return (
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
          image={state.getIn(['place', 'image'])}
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
            <Typography variant="caption">{this.props.time}</Typography>
          </Grid>
          <Grid item>
            <IconButton>
              <Icon>place</Icon>
            </IconButton>
            <Typography variant="caption">{this.props.distance}</Typography>
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
              [classes.expandOpen]: this.expanded
            })}
            onClick={this.props.handleExpandClick}
            aria-expanded={this.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph variant="body2">
              Meals
            </Typography>
            <MealPanels />
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

export default withStyles(styles)(Place);
