import { HTTP } from 'meteor/http'

export async function sendGETRequest (uri, headers) {

  return new Promise((resolve, reject) => {

    try{

      const reqOptions = {
        timeout: 20000,
        headers
      };

      HTTP.call('GET', uri, reqOptions,(error, result) =>{

        if(error){
          console.log(Error(error));
          resolve({ "url": uri, "status": "error" });
        } else {
          // console.log(result)
          resolve(result.data);

        }
      })

    } catch(e) {
      reject(e)
    }

  })

}

export async function sendPOSTRequest (uri, body, headers) {

  return new Promise((resolve, reject) => {

    try{

      const reqOptions = {
        data: body,
        headers
      };

      HTTP.post(uri, reqOptions, (error, result) => {

        if(error){
          console.log(Error(error));
          resolve({ "url": uri, "status": "error" });
        } else {
          // console.log(result)
          resolve(result.data);
        }
      })

    } catch(e) {
      reject(e)
    }

  });

}

export async function sendPUTRequest (uri, body, headers) {

  return new Promise((resolve, reject) => {

    try{

      const reqOptions = {
        data: body,
        headers
      };

      HTTP.put(uri, reqOptions, (error, result) => {

        if(error){
          console.log(Error(error));
          resolve({ "url": uri, "status": "error" });
        } else {
          // console.log(result)
          resolve(result.data);
        }
      })

    } catch(e) {
      reject(e)
    }

  });

}
