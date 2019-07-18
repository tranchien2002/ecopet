import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import PetDetail from './pages/PetDetail';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/pets/:address' component={PetDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
