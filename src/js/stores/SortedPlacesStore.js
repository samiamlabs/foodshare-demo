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

        this.emit('change');
        break;
      }
      case 'CLOSE_PLACES': {
        this.state = this.state.set(
          'closePlaces',
          Immutable.fromJS(action.places)
        );

        this.emit('change');
        break;
      }
      case 'MORE_PLACES': {
        this.state = this.state.set(
          'morePlaces',
          Immutable.fromJS(action.places)
        );

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
  closePlaces: [],
  morePlaces: [],
};

const sortedPlacesStore = new SortedPlacesStore();
dispatcher.register(sortedPlacesStore.handleActions.bind(sortedPlacesStore));

export default sortedPlacesStore;
