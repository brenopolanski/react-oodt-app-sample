import React, { Component } from 'react';
// import OODTPluginSample from './components/react-oodt-plugin-sample';
import OODTPluginSample from 'react-oodt-plugin-sample';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <OODTPluginSample productId="ce4380c5-d0d2-11e8-89ca-971c29fc9f21" />
      </div>
    );
  }
}

export default App;
