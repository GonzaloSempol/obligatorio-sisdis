import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Results from './Results';

const App = () => {
  const [page, setPage] = useState('login');

  if (page === 'results') {
    return <Results onExit={() => setPage('login')} />
  }
  return <Login onSuccess={() => setPage('results')} />
}

export default App;
