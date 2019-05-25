import React, { Component } from 'react';
import { Route, HashRouter, Redirect, Switch } from 'react-router-dom';
import Deduplicate from "./routes/deduplicate";
import FindDuplicates from './routes/findDuplicates';
import NavBar from './components/navbar';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar/>
        <HashRouter>
            <Switch>
                <Redirect path="/" to="/find-duplicates" exact />
                <Route path="/find-duplicates" component={FindDuplicates} />
                <Route path="/deduplicate" component={Deduplicate} />
            </Switch>
        </HashRouter>
      </React.Fragment>
    );
  }
}

export default App;
