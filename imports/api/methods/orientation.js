import { Meteor } from 'meteor/meteor'

import * as OrientationController from "../controllers/orientation";

Meteor.methods({

  async storeDataPoint({ timestamp, shippingId, orientation }) {

    try {
      console.log("STORING DATA POINT");

      OrientationController.storeDataPoint(timestamp, shippingId, orientation)

    } catch (e) {
      throw(e)
    }

  }

});