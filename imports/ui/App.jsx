import React from 'react';
import PropTypes from 'prop-types';
import MainContainer from './containers/main'

class App extends React.Component {

  constructor(props){
    super(props);
  }

  render(){

    return(

      <MainContainer/>

    )

  }

}

App.propTypes = {

};

export default App;
