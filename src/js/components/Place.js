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
  },
});

type Props = {
  expanded: boolean,
  mealExpanded: boolean,
  addOns: {name: string, price: number},
  selectedAddOns: Array<boolean>,
  totalPrice: number,
  specialInstructionsText: string,
  expanded: boolean,
  handleExpandClick: any,
  handleAddOnToggle: any,
  handleAddToCartClick: any,
  handleIncreaseMealNumber: any,
  handleDecreaseMealNumber: any,
};

class Place extends React.Component<Props> {


  render() {
    const {classes} = this.props;

    const foodSelectionPanels = (
      <div className={classes.foodSelectionPanels}>
        <Meal
          addOns={this.props.addOns}
          selectedAddOns={this.props.selectedAddOns}
          numberOfMeals={this.props.numberOfMeals}
          totalPrice={this.props.totalPrice}
          specialInstructionsText={this.props.specialInstructionsText}
          expanded={this.props.mealExpanded}
          handleAddOnToggle={this.props.handleAddOnToggle}
          handleAddToCartClick={this.props.handleAddToCartClick}
          handleIncreaseMealNumber={this.props.handleIncreaseMealNumber}
          handleDecreaseMealNumber={this.props.handleDecreaseMealNumber}
        />
      </div>
    );

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
              [classes.expandOpen]: this.props.expanded
            })}
            onClick={this.props.handleExpandClick}
            aria-expanded={this.props.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.props.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph variant="body2">
              Meals
            </Typography>
            {foodSelectionPanels}
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

export default withStyles(styles)(Place);
