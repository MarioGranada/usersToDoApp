import React from 'react';
import Header from './shared/components/Header/Header';
import HomeContainer from './containers/HomeContainer/HomeContainer';
import Footer from './shared/components/Footer/Footer';

import './App.css';

const App = () => {
  // Since this is a single container application, there is no need to add routing module
  // Also, there is no need to add Redux due to everything is controlled by services, components and given properties
  return (
    <div className="App">
      <Header />
      <HomeContainer />
      <Footer />
    </div>
  );
};

export default App;
