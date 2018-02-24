import dispatcher from '../dispatcher';
import FoodPlacesData from './json/FoodPlacesData';

class PlaceActions {
  getPlaceById = (id: number) => {
    // TODO: get place from backend API
    FoodPlacesData.forEach(place => {
      if (place._id === id) {
        dispatcher.dispatch({type: 'PLACE_BY_ID', id, place});
        return;
      }
    });
  };

  toggleAddOn = (placeId: number, mealId: number, addOnId: number) => {
    dispatcher.dispatch({type: 'TOGGLE_ADD_ON', placeId, mealId, addOnId});
  };

  increaseNumberOfMeals = (placeId: number, mealId: number) => {
    dispatcher.dispatch({type: 'INCREASE_NUMBER_OF_MEALS', placeId, mealId});
  };

  decreaseNumberOfMeals = (placeId: number, mealId: number) => {
    dispatcher.dispatch({type: 'DECREASE_NUMBER_OF_MEALS', placeId, mealId});
  };

  setSpecialInstructionsText = (placeId, mealId, value) => {
    dispatcher.dispatch({
      type: 'SPECIAL_INSTRUCTIONS_TEXT',
      placeId,
      mealId,
      value
    });
  };

  addToCart = (
    name,
    numberOfMeals,
    price,
    specialInstructionsText,
    selectedAddOnNames
  ) => {
    console.log(
      `Order: ${numberOfMeals} x ${name}, note: ${specialInstructionsText} price: ${price}`
    );
    console.log(selectedAddOnNames);
  };
}

const placeActions = new PlaceActions();
export default placeActions;
