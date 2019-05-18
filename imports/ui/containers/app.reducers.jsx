import {
  SHIPPING_STARTED,
  SHIPPING_COMPLETED
} from "./actions";


const defaultState = {
  shippingStarted: false,
  shippingId: null,
  shippingCompleted: false
};

export function appReducers(state = defaultState , action) {
  switch (action.type) {
    case SHIPPING_STARTED:
      return Object.assign({}, {
        ...state,
        shippingStarted: true,
        shippingId: action.shippingId
      });

    case SHIPPING_COMPLETED:
      return Object.assign({}, {
        ...state,
        shippingCompleted: true
      });

    default:
      return state
  }
}
