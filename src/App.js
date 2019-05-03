import React, { Component } from 'react';
import { Route, HashRouter, Redirect, Switch } from 'react-router-dom';
import FindDuplicates from './routes/findDuplicates';
import NavBar from './components/navbar';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar/>
        <HashRouter>
            <Switch>
                <Redirect path="/" to="/find-duplicates-by-url" exact />
                <Route path="/find-duplicates-by-url" component={FindDuplicates} />
            </Switch>
        </HashRouter>
      </React.Fragment>
    );
  }
}

export default App;
