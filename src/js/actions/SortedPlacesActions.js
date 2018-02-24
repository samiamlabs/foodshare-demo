import dispatcher from '../dispatcher';
import UnderThirtyMinutes from './json/UnderThirtyMinutes.json';
import Close from './json/Close.json';
import More from './json/More.json';

class SortedPlacesActions {
  getFoodPlaces = () => {
    dispatcher.dispatch({
      type: 'UNDER_THIRTY_MINUTES_PLACES',
      places: UnderThirtyMinutes
    });
    dispatcher.dispatch({type: 'CLOSE_PLACES', places: Close});
    dispatcher.dispatch({type: 'MORE_PLACES', places: More});
  };
}

const sortedPlacesActions = new SortedPlacesActions();
export default sortedPlacesActions;
