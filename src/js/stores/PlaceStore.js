import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';

import Immutable from 'immutable';

class PlaceStore extends EventEmitter {
  constructor() {
    super();
    this.state = Immutable.fromJS(PlaceStore.defaultState);
    this.lastState = this.state;

    // FIXME: are 20 to much?
    this.setMaxListeners(20);
  }

  handleActions(action) {
    switch (action.type) {
      case 'PLACE_BY_ID': {
        this.state = this.state.setIn(
          ['places', action.id, 'place'],
          Immutable.fromJS(action.place)
        );

        if (this.state !== this.lastState) {
          // Set place card to not expanded
          this.state = this.state.setIn(
            ['places', action.id, 'placeExpanded'],
            false
          );

          this.state
            .getIn(['places', action.id, 'place', 'meals'])
            .forEach(meal => {
              // Set meal to not expanded
              this.state = this.state.setIn(
                ['places', action.id, 'mealsExpanded', meal.get('_id')],
                false
              );
              // Set number of meals to 1
              this.state = this.state.setIn(
                ['places', action.id, 'numberOfMeals', meal.get('_id')],
                1
              );
              // Set specialInstructionsText to empty
              this.state = this.state.setIn(
                [
                  'places',
                  action.id,
                  'specialInstructionsText',
                  meal.get('_id')
                ],
                ''
              );
              meal.get('add_ons').forEach(addOn => {
                // Deselect all add-ons in place
                this.state = this.state.setIn(
                  [
                    'places',
                    action.id,
                    'selectedAddOns',
                    meal.get('_id'),
                    addOn.get('_id')
                  ],
                  false
                );
              });
            });
        }

        this.emit('change');
        break;
      }
      case 'TOGGLE_ADD_ON': {
        const currentToggleState = this.state.getIn([
          'places',
          action.placeId,
          'selectedAddOns',
          action.mealId,
          action.addOnId
        ]);

        this.state = this.state.setIn(
          [
            'places',
            action.placeId,
            'selectedAddOns',
            action.mealId,
            action.addOnId
          ],
          !currentToggleState
        );

        this.emit('change');
        break;
      }
      case 'INCREASE_NUMBER_OF_MEALS': {
        const numberOfMeals = this.state.getIn([
          'places',
          action.placeId,
          'numberOfMeals',
          action.mealId
        ]);

        this.state = this.state.setIn(
          ['places', action.placeId, 'numberOfMeals', action.mealId],
          numberOfMeals + 1
        );
        this.emit('change');
        break;
      }
      case 'DECREASE_NUMBER_OF_MEALS': {
        const numberOfMeals = this.state.getIn([
          'places',
          action.placeId,
          'numberOfMeals',
          action.mealId
        ]);

        if (numberOfMeals > 1) {
          this.state = this.state.setIn(
            ['places', action.placeId, 'numberOfMeals', action.mealId],
            numberOfMeals - 1
          );
        }
        this.emit('change');
        break;
      }
      case 'SPECIAL_INSTRUCTIONS_TEXT': {
        this.state = this.state.setIn(
          ['places', action.placeId, 'specialInstructionsText', action.mealId],
          action.value
        );

        break;
      }
      case 'EXPAND_PLACE': {
        const currentExpandState = this.state.getIn([
          'places',
          action.placeId,
          'placeExpanded'
        ]);

        this.state = this.state.setIn(
          ['places', action.placeId, 'placeExpanded'],
          !currentExpandState
        );

        this.emit('change');

        break;
      }
      case 'EXPAND_MEAL': {
        const currentExpandState = this.state.getIn([
          'places',
          action.placeId,
          'mealsExpanded',
          action.mealId
        ]);

        this.state = this.state.setIn(
          ['places', action.placeId, 'mealsExpanded', action.mealId],
          !currentExpandState
        );

        this.emit('change');

        break;
      }
      default:
      // Do nothing
    }
  }

  getStateById(id) {
    const placeState = this.state.getIn(['places', id]);
    if (typeof placeState === 'undefined') {
      return Immutable.fromJS(PlaceStore.defaultPlaceState);
    }
    return placeState;
  }
}

PlaceStore.defaultPlaceState = {
  place: {
    _id: 0,
    name: '',
    owner: {
      first_name: '',
      last_name: '',
      email: '',
      avatar: ''
    },
    food_type: '',
    image: 'http://dummyimage.com/112x169.jpg/5fa2dd/ffffff',
    rating: 0,
    wait_time: 0,
    wait_time_margin: 0,
    distance: 0,
    location: {
      contry: '',
      city: '',
      street_address: '',
      latitude: 0,
      longitude: 0
    },
    meals: []
  },
  selectedAddOns: {},
  numberOfMeals: {},
  placeExpanded: false,
  mealsExpanded: {}
};

PlaceStore.defaultState = {
  places: {}
};

const placeStore = new PlaceStore();
dispatcher.register(placeStore.handleActions.bind(placeStore));

export default placeStore;
