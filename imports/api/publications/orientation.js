import { Meteor } from 'meteor/meteor'

import * as OrientationController from "../controllers/orientation";

Meteor.publish("orientation", function (shippingId) {
  const result = OrientationController.getShippingData(shippingId);
  if(result){
    return result
  } else {
    return 404
  }
}, {
  url: "orientation/:0",
  httpMethod: "get"
});


Meteor.publish("shippingids", function () {
  const result = OrientationController.getShippingIds();
  if(result){
    console.log(result);
    return result;
  } else {
    return 404
  }
}, {
  url: "shippingids",
  httpMethod: "get"
});