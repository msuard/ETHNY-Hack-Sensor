import React from 'react';
import PropTypes from 'prop-types';

import uuidv4 from 'uuid/v4';


class Button extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }


  componentDidMount() {

  }

  componentDidUpdate() {

  }

  startShipping(){
    const shippingId = uuidv4();
    this.props.onStartShipping(shippingId)
  }


  render() {

    return (

      <button id="button" type="button" className="btn btn-warning btn-lg" onClick={ this.startShipping.bind(this) }>Start Shipping</button>

    )

  }

}

Button.propTypes = {

};

export default Button
