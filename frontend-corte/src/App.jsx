import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Results from './Results';
import Config from './Config';

const App = () => {
  const [page, setPage] = useState('config');

  if (page === 'results') {
    return <Results onExit={() => setPage('login')} />;
  }
  if (page === 'config') {
    return <Config onExit={() => setPage('login')} />;
  }
  return <Login onSuccess={() => setPage('results')} onSetup={() => setPage('config')} />;
};

export default App;
