import React from 'react';
import PropTypes from 'prop-types';

import Body from "./body/body"

import * as APIService from '../services/apiService';
import * as ElGamal from '../crypto/elGamal';

const orientationPrimes = [2, 3, 5];

const g = "23114357934155028";
const p = "170141183460469231731690190877448458819";
const A = "8196641841371205329673726354863932167";

class MainComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      orientation: null,
      setInterval: null,
      brokenPackage: false
    }
  }

  componentDidMount(){

    // ElGamal.generateKeyPairAsync(128);

    this.changeOrientation();

    window.addEventListener("orientationchange", this.changeOrientation.bind(this));
  }

  async componentDidUpdate(prevProps, prevState) {

    if(this.props.shippingId !== prevProps.shippingId){
      console.log(this.props.shippingId);
    }

    if (this.state.orientation !== prevState.orientation && this.props.shippingId) {
      const timestamp = Date.now();

      console.log("TIMESTAMP " + timestamp);

      const encryptedTimestamp = await ElGamal.encryptMessage(timestamp, p, g, A);
      const encryptedOrientation = await ElGamal.encryptMessage(this.state.orientation, p, g, A);

      let encryptedTimestampEphemeralKey = {
        c1: "1",
        c2: "1"
      }//await ElGamal.encryptMessage(encryptedTimestamp.k, p, g, A);

      console.log("EPHEMERAL KEY " + encryptedOrientation.k);

      let encryptedOrientationEphemeralKey = await ElGamal.encryptMessage(encryptedOrientation.k, p, g, A);


      APIService.sendDataPoint(
        {

          c1: encryptedTimestamp.c1,
          c2: encryptedTimestamp.c2
        },

        this.props.shippingId,

        {
          c1: encryptedOrientation.c1,
          c2: encryptedOrientation.c2
        },

        {
          c1: encryptedTimestampEphemeralKey.c1,
          c2: encryptedTimestampEphemeralKey.c2
        },

        {
          c1: encryptedOrientationEphemeralKey.c1,
          c2: encryptedOrientationEphemeralKey.c2
        }
      )
    }

    if (this.props.shippingStarted !== prevProps.shippingStarted) {

      let newState = this.state;

      newState.setInterval = setInterval(this.sendDataPoint.bind(this), 1000);

      this.setState(newState);

    }

    if (this.props.shippingCompleted !== prevProps.shippingCompleted) {
      clearInterval(this.state.setInterval);
    }
  }

  changeOrientation(){
    console.log("the orientation of the device is now " + screen.orientation.angle);
    let orientationPrime;
    if(screen.orientation.angle === 0){
      orientationPrime = orientationPrimes[0]
    } else if(screen.orientation.angle === 90){
      orientationPrime = orientationPrimes[1]
    } else if(screen.orientation.angle === 270){
      orientationPrime = orientationPrimes[2]
    } else {
      console.log("WARNING: orientation = " + screen.orientation.angle)
    }

    let newState = this.state;

    if(orientationPrime === 5){
      newState.brokenPackage = true;
    }

    newState.orientation = orientationPrime;

    this.setState(newState);

    this.sendDataPoint();
  }

  async sendDataPoint(){
    console.log("SENDING DATA POINT: " + this.state.orientation);

    const timestamp = Date.now();

    console.log("TIMESTAMP " + timestamp);

    let encryptedTimestamp = await ElGamal.encryptMessage(timestamp, p, g, A);
    let encryptedOrientation = await ElGamal.encryptMessage(this.state.orientation, p, g, A);

    let encryptedTimestampEphemeralKey = {
      c1: "1",
      c2: "1"
    };

    //await ElGamal.encryptMessage(encryptedTimestamp.k, p, g, A);

    console.log("EPHEMERAL KEY " + encryptedOrientation.k);

    let encryptedOrientationEphemeralKey = await ElGamal.encryptMessage(encryptedOrientation.k, p, g, A);


    APIService.sendDataPoint({

      c1: encryptedTimestamp.c1,
      c2: encryptedTimestamp.c2
      },

      this.props.shippingId,

      {
        c1: encryptedOrientation.c1,
        c2: encryptedOrientation.c2
      },

      {
        c1: encryptedTimestampEphemeralKey.c1,
        c2: encryptedTimestampEphemeralKey.c2
      },

      {
        c1: encryptedOrientationEphemeralKey.c1,
        c2: encryptedOrientationEphemeralKey.c2
      }

    )

  }

  render(){

    return (

      <main id="main" role="main" className="site-content"  style={ {backgroundColor: this.state.brokenPackage ? "#EE3553" : "#5FAD41" }}>

        <Body
        orientation={this.state.orientation}
        shippingStarted={this.props.shippingStarted}
        shippingId={this.props.shippingId}
        shippingCompleted={this.props.shippingCompleted}
        onStartShipping={this.props.onStartShipping}
        onShippingCompleted={this.props.onShippingCompleted}
        />

      </main>

    )

  }

}

MainComponent.propTypes = {

};

export default MainComponent
