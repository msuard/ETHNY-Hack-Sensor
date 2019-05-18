import { Orientation } from '../collections/orientation';

export function storeDataPoint(timestamp, shippingId, orientation){
  return Orientation.insert({
    timestamp,
    shippingId,
    orientation
  });
}

export function getShippingData(shippingId){
  return Orientation.find({
    shippingId
  });
}

export function getShippingIds(){
  return Orientation.find({
    timestamp: {"$gte": 0}
  });
}