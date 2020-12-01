import React from 'react';
import {
  HashRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import { SignInContainer } from './pages/Auth/SignIn/SignInContainer';
import { SignUpContainer } from './pages/Auth/SignUp/SignUpContainer';
import PrivateRoute from './components/CustomRoutes/CustomRoutes';
import routing from './routing/routing';
import { ListNotesContainer } from './pages/ListNotes/ListNotesContainer';
import { NotFound } from './pages/NotFound/NotFound';
import { Container } from './components/Container/Container';

function App() {
  const routes = (
    <HashRouter>
      <Switch>
        {/* PUBLIC PAGES */}
        <Route exact path={routing().root} component={SignInContainer} />
        <Route exact path={routing().register} component={SignUpContainer} />
        <Route exact path={routing().notFound} component={NotFound} />

        {/* PROTECTED PAGES */}
        <PrivateRoute exact path={routing().notes} component={ListNotesContainer} />

        {/* NOT FOUND */}
        <Route exact path="*">
          <Redirect to={routing().notFound} />
        </Route>
      </Switch>
    </HashRouter>
  );

  return (
    <Container>
      {routes}
    </Container>
  );
}

export default App;
