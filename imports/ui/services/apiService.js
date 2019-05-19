//import { Meteor } from 'meteor/meteor'
import * as request from '../utils/request';

export function sendDataPoint (timestamp, shippingId, orientation, timestampEphemeralKey, orientationEphemeralKey) {

  return new Promise((resolve, reject) => {

    try {
      /*
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
      */

      const url = 'http://3.83.156.163:3030' + '/orientation';

      console.log('\n' + url);

      const body = {
        timestamp, shippingId, orientation, timestampEphemeralKey, orientationEphemeralKey
      };

      return request.sendPOSTRequest(url, body);

    } catch(e){
      reject(e)
    }

  });


}
