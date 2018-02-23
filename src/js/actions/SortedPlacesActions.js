import dispatcher from '../dispatcher';
import FoodPlacesData from './json/FoodPlacesData';

class SortedPlacesActions {
  getFoodPlaces = () => {
    dispatcher.dispatch({type: 'UNDER_THIRTY_MINUTES_PLACES', places: FoodPlacesData});
  }

}

const sortedPlacesActions = new SortedPlacesActions();
export default sortedPlacesActions;
