import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Results from './Results';
import Config from './Config';
import Logout from './Logout';

const App = () => {
  const [page, setPage] = useState('login');

  if (page === 'results') {
    return <Results onExit={() => setPage('login')} />;
  }
  if (page === 'config') {
    return <Config onExit={() => setPage('login')} onSuccess={() => setPage('logout')} />;
  }
  if (page === 'logout') {
    return <Logout onSuccess={() => setPage('login')} />;
  }
  return <Login onSuccess={() => setPage('results')} onSetup={() => setPage('config')} />;
};

export default App;
