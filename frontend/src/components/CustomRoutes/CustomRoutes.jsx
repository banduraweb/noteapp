import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import routing from '../../routing/routing';
import { loggedIn } from '../../heplers/tokenChecker';

export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (loggedIn() ? (
      <>
        <Component {...props} {...rest} />
      </>
    ) : (
      <Redirect to={routing().root} />
    ))}
  />
);
