import {
  SHIPPING_STARTED,
  SHIPPING_COMPLETED

} from "./actions";


export function startShipping(shippingId){
  return {
    type: SHIPPING_STARTED,
    shippingId
  };
}

export function completeShipping(){
  return {
    type: SHIPPING_COMPLETED,
  };
}
