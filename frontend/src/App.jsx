import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Logout from './Logout';
import Vote from './Vote';

const App = () => {
  const [page, setPage] = useState('login');
  // setPage('login');

  if (page === 'vote') {
    return <Vote onSuccess={() => setPage('logout')} onExit={() => setPage('login')} />;
  }
  if (page === 'logout') {
    return <Logout onSuccess={() => setPage('login')} />;
  }
  return <Login onSuccess={() => setPage('vote')} />;
};

export default App;
