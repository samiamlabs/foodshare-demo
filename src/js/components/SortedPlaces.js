import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import SortedPlacesActions from '../actions/SortedPlacesActions';
import SortedPlacesStore from '../stores/SortedPlacesStore';

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
    backgroundColor: theme.palette.grey[100],
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
  }
});

class SortedPlaces extends React.Component {
  state = {
    store: SortedPlacesStore.getState(),
  };

  getStoreState = () => {
    this.setState({
      store: SortedPlacesStore.getState()
    });
  };

  componentWillMount() {
    SortedPlacesStore.on('change', this.getStoreState);
    SortedPlacesActions.getFoodPlaces();
  }

  componentWillUnount() {
    SortedPlacesActions.removeListener('change', this.getStoreState);
  }


  render() {
    const {classes} = this.props;

    const state = this.state.store;
    const underThirtyPlaces = state.get('underThirtyMinutesPlaces');
    const closePlaces = state.get('closePlaces');
    const morePlaces = state.get('morePlaces');

    const PlaceArray = props => {
      const placeList = [];
      props.places.forEach((place, index) => {
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

    const PlaceList = props => (
      <Grid item>
        <Paper className={classes.paper}>
          <Grid container alignItems="center" justify="center" direciton="row">
            <Grid className={classes.titlePaper} item>
              <Typography variant="title">{props.title}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={16}>
            <PlaceArray numberOfPlaces={props.max} places={props.places} />
          </Grid>
          <Grid
            container
            alignItems="flex-end"
            justify="flex-end"
            direction="row"
          >
            <Grid item>
              <Button
                color="primary"
                className={classes.moreButton}
                onClick={this.props.handleMoreClick.bind(this, props.title)}
              >
                {props.buttonLabel}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );

    const maxDisplayUnderThirty = this.props.underThirtyExpanded ? 5 : 2;
    const maxDisplayClose = this.props.closeExpanded ? 5 : 2;
    const maxDisplayMore = this.props.moreExpanded ? 10 : 2;

    const labelDisplayUnderThirty = this.props.underThirtyExpanded
      ? 'LESS'
      : 'MORE';
    const labelDisplayClose = this.props.closeExpanded ? 'LESS' : 'MORE';
    const labelDisplayMore = this.props.moreExpanded ? 'LESS' : 'MORE';

    return (
      <div className={classes.root}>
        <Grid container direction="column" justify="space-between">
          <PlaceList
            title="Under 30 minutes"
            places={underThirtyPlaces}
            max={maxDisplayUnderThirty}
            buttonLabel={labelDisplayUnderThirty}
          />
          <PlaceList
            title="Close to you"
            places={closePlaces}
            max={maxDisplayClose}
            buttonLabel={labelDisplayClose}
          />
          <PlaceList
            title="More places"
            places={morePlaces}
            max={maxDisplayMore}
            buttonLabel={labelDisplayMore}
          />
        </Grid>
      </div>
    );
  }
}

SortedPlaces.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SortedPlaces);
