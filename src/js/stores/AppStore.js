import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';

class AppStore extends EventEmitter {
  snackBarMessage = '';
  cart = [];

  handleActions(action) {
    switch (action.type) {
      case 'ADD_TO_CART': {
        this.snackBarMessage =
          'Added ' + action.numberOfMeals + ' items to cart';

        let addOnsSummary = '';
        action.selectedAddOnNames.forEach(addOnName => {
          addOnsSummary += ' ' + addOnName;
        });

        let cartText = `${action.numberOfMeals} x ${action.name}`;
        if (addOnsSummary !== '') {
          // cartText += ` Add-ons:${addOnsSummary}`;
          cartText += ' + addons'
        }

        if (action.specialInstructionsText !== '') {
          // cartText += ` Note: ${action.specialInstructionsText}, `;
          cartText += ' with note'
        }

        cartText += ` ${action.price} kr`
        this.cart.push(cartText);
        this.emit('openSnackBar');
        break;
      }
      default:
      // Do nothing
    }
  }

  getSnackBarMessage() {
    return this.snackBarMessage;
  };

  getCart() {
    return this.cart;
  }
}

const appStore = new AppStore();
dispatcher.register(appStore.handleActions.bind(appStore));

export default appStore;
