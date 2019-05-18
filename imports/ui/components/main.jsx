import React from 'react';
import PropTypes from 'prop-types';

import Body from "./body/body"

import * as APIService from '../services/apiService';
import * as ElGamal from '../crypto/elGamal';

const orientationPrimes = [2, 3, 5];

const p = Meteor.settings.public.p;
const g = Meteor.settings.public.g;
const A = Meteor.settings.public.A;


class MainComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      orientation: null,
      setInterval: null
    }
  }

  componentDidMount(){

    // ElGamal.generateKeyPairAsync();

    this.changeOrientation();

    window.addEventListener("orientationchange", this.changeOrientation.bind(this));
  }

  async componentDidUpdate(prevProps, prevState) {

    if(this.props.shippingId !== prevProps.shippingId){
      console.log(this.props.shippingId);
    }

    if (this.state.orientation !== prevState.orientation && this.props.shippingId) {
      const timestamp = Date.now();

      const encryptedTimestamp = await ElGamal.encryptMessage(timestamp, p, g, A);
      const encryptedOrientation = await ElGamal.encryptMessage(this.state.orientation, p, g, A);

      APIService.sendDataPoint(encryptedTimestamp, this.props.shippingId, encryptedOrientation)    }

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

    this.setState({
      orientation: orientationPrime
    })
  }

  async sendDataPoint(){
    console.log("SENDING DATA POINT: " + this.state.orientation);

    const timestamp = Date.now();

    const encryptedTimestamp = await ElGamal.encryptMessage(timestamp, p, g, A);
    const encryptedOrientation = await ElGamal.encryptMessage(this.state.orientation, p, g, A);


    APIService.sendDataPoint(encryptedTimestamp, this.props.shippingId, encryptedOrientation)
  }


  render(){

    return (

      <main id="main" role="main" className="site-content">

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
