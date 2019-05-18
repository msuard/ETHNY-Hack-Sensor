import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import Root from '../imports/ui/containers/root';
import App from '../imports/ui/App';

Meteor.startup(() => {
  render(
  <Root>
    <App/>
  </Root>
    , document.getElementById('react-target'));
});
