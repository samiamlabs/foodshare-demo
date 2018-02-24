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
    backgroundColor: theme.palette.primary.light
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
  state = {
    store: PlaceStore.getStateById(this.props.id),
    specialInstructionsText: ''
  };

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
    const distance =
      Math.floor(this.state.store.getIn(['place', 'distance']) / 100) / 10;
    return `${distance} km`;
  };

  getTimeString = () => {
    const place = this.state.store.get('place');
    const minTime = place.get('wait_time');
    const maxTime = minTime + place.get('wait_time_margin');

    return `${minTime} - ${maxTime} minutes`;
  };

  handleExpandClick = () => {
    PlaceActions.expandPlace(this.state.store.getIn(['place', '_id']));
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
    const state = PlaceStore.getStateById(this.props.id);
    const numberOfMeals = state.getIn(['numberOfMeals', mealId]);
    const name = state.getIn(['place', 'meals', mealId, 'name']);
    const price = this.getTotalPrice(mealId);

    const selectedAddOnNames = [];
    state.getIn(['place', 'meals']).forEach(meal => {
      if (meal.get('_id') === mealId) {
        meal.get('add_ons').forEach(addOn => {
          if (state.getIn(['selectedAddOns', mealId, addOn.get('_id')])) {
            selectedAddOnNames.push(addOn.get('name'));
          }
        });
      }
    });

    const specialInstructionsText = state.getIn([
      'specialInstructionsText',
      mealId
    ]);

    PlaceActions.addToCart(
      name,
      numberOfMeals,
      price,
      specialInstructionsText,
      selectedAddOnNames
    );
  };

  handleExpandMealToggle = (mealId, event) => {
    PlaceActions.expandMeal(this.state.store.getIn(['place', '_id']), mealId);
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

  handleSpecialInstructionsTextChange = (value, mealId) => {
    PlaceActions.setSpecialInstructionsText(
      this.state.store.getIn(['place', '_id']),
      mealId,
      value
    );
  };

  render() {
    const {classes} = this.props;
    const state = this.state.store;

    const MealPanels = props => {
      const mealList = [];
      state.getIn(['place', 'meals']).forEach(meal => {
        const selectedAddOns = state.getIn(['selectedAddOns', meal.get('_id')]);
        const specialInstructionsText = state.getIn([
          'specialInstructionsText',
          meal.get('_id')
        ]);
        mealList.push(
          <Meal
            key={meal.get('_id')}
            mealState={meal.toJS()}
            selectedAddOns={selectedAddOns.toJS()}
            numberOfMeals={state.getIn(['numberOfMeals', meal.get('_id')])}
            totalPrice={this.getTotalPrice(meal.get('_id'))}
            expanded={state.getIn(['mealsExpanded', meal.get('_id')])}
            specialInstructionsText={specialInstructionsText}
            handleExpandMealToggle={this.handleExpandMealToggle}
            handleAddOnToggle={this.handleAddOnToggle}
            handleAddToCartClick={this.handleAddToCartClick}
            handleIncreaseMealNumber={this.handleIncreaseMealNumber}
            handleDecreaseMealNumber={this.handleDecreaseMealNumber}
            handleSpecialInstructionsTextChange={
              this.handleSpecialInstructionsTextChange
            }
          />
        );
      });

      return <div className={classes.foodSelectionPanels}>{mealList}</div>;
    };

    const expanded = state.get('placeExpanded');
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Place" src={state.getIn(['place', 'owner', 'avatar'])} className={classes.avatar}/>
          }
          action={
            <div>
              <IconButton className={classes.starButton}>
                <StarIcon color="secondary" />
              </IconButton>
              <Typography>{state.getIn(['place', 'rating'])}</Typography>
            </div>
          }
          title={state.getIn(['place', 'name'])}
          subheader={state.getIn(['place', 'food_type'])}
        />
        <CardMedia
          className={classes.media}
          image={state.getIn(['place', 'image'])}
          title="Contemplative Reptile"
          onClick={this.handleExpandClick}
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
            <Typography variant="caption">{this.getTimeString()}</Typography>
          </Grid>
          <Grid item>
            <IconButton>
              <Icon>place</Icon>
            </IconButton>
            <Typography variant="caption">{this.getDistance()}</Typography>
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
              [classes.expandOpen]: expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
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
