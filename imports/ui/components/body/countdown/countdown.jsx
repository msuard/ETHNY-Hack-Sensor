import React from 'react';
import PropTypes from 'prop-types';

class Countdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      countDownDate: null,
      setInterval: null
    }
  }


  componentDidMount() {

    // Set the date we're counting down to
    let newState = this.state;
    newState.countDownDate = Date.now() + 10500;
    this.setState(newState);
    // Update the count down every 1 second
    newState = this.state;
    newState.setInterval = setInterval(this.countDown.bind(this), 1000);
    this.setState(newState);

  }

  componentDidUpdate() {
  }

  countDown(){
    // Find the distance between now and the count down date
    const distance = this.state.countDownDate - Date.now();

    // Time calculations for days, hours, minutes and seconds
    // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    //document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    document.getElementById("time").innerHTML = seconds + "s ";

    // If the count down is finished, write some text
    if (seconds <= 0) {
      clearInterval(this.state.setInterval);
      // document.getElementById("countdown").innerHTML = "SHIPPING COMPLETED";
      this.props.onShippingCompleted();
    }
  }


  render() {

    return (
        <div id="countdown">
          <div id="time">10 s</div>
          <div id="shippingId">Shipment in progress...</div>
        </div>

    )

  }

}

Countdown.propTypes = {

};

export default Countdown
