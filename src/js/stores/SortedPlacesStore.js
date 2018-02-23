import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';

import Immutable from 'immutable';

class SortedPlacesStore extends EventEmitter {
  constructor() {
    super();
    this.state = Immutable.fromJS(SortedPlacesStore.defaultState);
  }

  getState() {
    return this.state;
  }

  handleActions(action) {
    switch (action.type) {
      case 'UNDER_THIRTY_MINUTES_PLACES': {
        this.state = this.state.set(
          'underThirtyMinutesPlaces',
          Immutable.fromJS(action.places)
        );

        // TODO: Change implementation to allow update and preserve selection
        this.state.get('underThirtyMinutesPlaces').forEach(place => {
          place.get('meals').forEach(meal => {
            meal.get('add_ons').forEach(addOn => {
              this.state = this.state.setIn(
                [
                  'selectedAddOns',
                  place.get('_id'),
                  meal.get('_id'),
                  addOn.get('_id')
                ],
                false
              );
            });
          });
        });

        this.emit('change');
        break;
      }
      default:
      // Do nothing
    }
  }
}

// Default state
SortedPlacesStore.defaultState = {
  underThirtyMinutesPlaces: [],
  selectedAddOns: {}
};

const sortedPlacesStore = new SortedPlacesStore();
dispatcher.register(sortedPlacesStore.handleActions.bind(sortedPlacesStore));

export default sortedPlacesStore;
