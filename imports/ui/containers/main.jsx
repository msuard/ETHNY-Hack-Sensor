import React from 'react';
import { connect } from 'react-redux'
import MainComponent  from '../components/main';

import {
  startShipping,
  completeShipping
} from "./app.actions";

const mapStateToProps = (state, ownProps) => {

  return {
    shippingStarted: state.appReducers.shippingStarted,
    shippingId: state.appReducers.shippingId,
    shippingCompleted: state.appReducers.shippingCompleted,
  }

};

const mapDispatchToProps = dispatch => {

  return {

    onStartShipping: (shippingId) => {
      console.log("SHIPPING STARTED");
      dispatch(startShipping(shippingId));
    },

    onShippingCompleted: () => {
      console.log("SHIPPING COMPLETED");
      dispatch(completeShipping());
    }

  }

};

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(MainComponent);

export default MainContainer

