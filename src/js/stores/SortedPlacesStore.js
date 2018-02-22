import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';

class SortedPlacesStore extends EventEmitter {
  constructor() {
    super();
    this.state = null;
  }

  handleActions(action) {

  }
}

const sortedPlacesStore = new SortedPlacesStore();
dispatcher.register(sortedPlacesStore.handleActions.bind(sortedPlacesStore));
