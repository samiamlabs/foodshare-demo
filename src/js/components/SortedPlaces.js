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
import ExpansionPanel, {
  ExpansionPanelSummary
} from 'material-ui/ExpansionPanel';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import Snackbar from 'material-ui/Snackbar';
import CloseIcon from 'material-ui-icons/Close';

// import SortedPlacesActions from '../actions/SortedPlacesActions';
// import SortedPlacesStore from '../stores/SortedPlacesStore';

import Fade from 'material-ui/transitions/Fade';

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
    width: '100%',
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
  addOnList: {
    width: '100%'
  },
  textField: {
    width: '80%',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  numberOfSelectedFood: {
    margin: theme.spacing.unit * 2
  },
  leftIcon: {
    marginLeft: theme.spacing.unit
  },
  addToBasketButton: {
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
    bottom: 55,
  }
});

class SortedPlaces extends React.Component {
  state = {expanded: false, checked: [], open: false};

  handleExpandClick = () => {
    this.setState({expanded: !this.state.expanded});
  };

  handleToggle = value => () => {
    const {checked} = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  handleClick = () => {
    this.setState({open: true});
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({open: false});
  };

  getListItemName(value) {
    let itemName = 'not found';
    switch (value) {
      case 0: {
        itemName = 'Fries';
        break;
      }
      case 1: {
        itemName = 'Soda';
        break;
      }
      case 2: {
        itemName = 'Dip';
        break;
      }
      default:
      // Do nothing
    }
    return itemName;
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

    const numberOfSelectedFood = (
      <div className={classes.numberOfSelectedFood}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Paper>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={8}
            >
              <Grid item>
                <IconButton>
                  <Icon>remove</Icon>
                </IconButton>
              </Grid>
              <Grid item>
                <Typography>3</Typography>
              </Grid>
              <Grid item>
                <IconButton>
                  <Icon>add</Icon>
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </div>
    );

    const addOnList = (
      <div className={classes.addOnList}>
        <List>
          {[0, 1, 2].map(value => (
            <ListItem
              key={value}
              dense
              button
              onClick={this.handleToggle(value)}
              className={classes.listItem}
            >
              <Checkbox
                checked={this.state.checked.indexOf(value) !== -1}
                tabIndex={-2}
                disableRipple
              />
              <ListItemText primary={this.getListItemName(value)} />
              <ListItemText primary={`${20 - value} kr`} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    const burgerPannel = (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="body2" className={classes.heading}>
            Burger
          </Typography>
        </ExpansionPanelSummary>
        <div>
          <Typography variant="body2">FOOD ADD-ONS</Typography>
          {addOnList}
        </div>
        <div>
          <Typography variant="body2">SPECIAL INSTRUCTIONS</Typography>
          <TextField
            id="uncontrolled"
            label="Extra sauce, no onions, etc"
            margin="normal"
            className={classes.textField}
          />
        </div>
        {numberOfSelectedFood}
        <Button
          variant="raised"
          color="secondary"
          fullWidth={true}
          onClick={this.handleClick}
        >
          ADD 3 TO BASKET 58 kr
          <Icon className={classes.leftIcon}>add_shopping_cart</Icon>
        </Button>
      </ExpansionPanel>
    );

    const foodSelectionPanels = (
      <div className={classes.foodSelectionPanels}>
        {burgerPannel}
        {burgerPannel}
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
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
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