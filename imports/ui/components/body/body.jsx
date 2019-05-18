import React from 'react';
import PropTypes from 'prop-types';

import Button from './button/button'
import Countdown from './countdown/countdown'
import Result from './result/result'

class Body extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }


  componentDidMount() {

  }

  componentDidUpdate() {

  }


  render() {

    if(!this.props.shippingStarted && !this.props.shippingCompleted){
      return (

        <div id="body" className="row">
          <Button
            onStartShipping={this.props.onStartShipping}
          />
        </div>

      )
    } else if(this.props.shippingStarted && !this.props.shippingCompleted) {
      return (

        <div id="body" className="row">
          <Countdown
            shippingId={this.props.shippingId}
            onShippingCompleted={this.props.onShippingCompleted}
          />
        </div>

      )
    } else if(this.props.shippingStarted && this.props.shippingCompleted){

      return (

        <div id="body" className="row">
          <Result
          />
        </div>

      )

    }



  }

}

Body.propTypes = {

};

export default Body
