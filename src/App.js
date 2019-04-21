import React, { Component } from 'react';
import FindDuplicates from './components/findDuplicates';
import NavBar from './components/navbar';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar/>
        <FindDuplicates/>
      </React.Fragment>
    );
  }
}

export default App;
