import React from "react";
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import reducers from "./reducers";

const store = createStore(reducers);

const Root = (props) => (

        <Provider store={ store }>
          <noscript>
            You need to enable JavaScript to run this app.
          </noscript>

          {props.children}

        </Provider>

);

export default Root;

