import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { isAuthenticated } from './actions/auth';

//components
import Login from './auth/Login';
import Staff from './dashboard/Staff';

const App = () => {
  const { user } = isAuthenticated();

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={user ? <Staff /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
