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

import SortedPlacesActions from '../actions/SortedPlacesActions';
import SortedPlacesStore from '../stores/SortedPlacesStore';

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
  state = {store: SortedPlacesStore.getState()};

  getStoreState = () => {
    this.setState({
      store: SortedPlacesStore.getState()
    });
  };

  componentWillMount() {
    SortedPlacesStore.on('change', this.getStoreState);
    SortedPlacesActions.getFoodPlaces();
  }

  componentWillUnMount() {
    SortedPlacesActions.removeListener('change', this.getStoreState);
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

    const state = this.state.store;
    const places = state.get('underThirtyMinutesPlaces');

    const PlaceList = props => {
      const placeList = [];
      places.forEach((place, index) => {
        // FIXME: use list of _id
        if (index < props.numberOfPlaces) {
          placeList.push(
            <Grid key={place.get('_id')} item className={classes.cardGrid}>
              <Place id={place.get('_id')} />
            </Grid>
          );
        }
      });
      return placeList;
    };

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
            <PlaceList numberOfPlaces={2} />
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
