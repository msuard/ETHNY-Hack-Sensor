import { Meteor } from 'meteor/meteor'

export function sendDataPoint (timestamp, shippingId, orientation){

  return new Promise((resolve, reject) => {

    try {

      Meteor.call('storeDataPoint', { timestamp, shippingId, orientation }, (error, result) => {

        if (error) {
          console.log(Error(error));
          resolve({ 'method': 'storeDataPoint', 'status': 'error' });
        } else {
          console.log(result);
          resolve(result);
        }
      })

    } catch (e) {
      reject(e)
    }

  })

}
