import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { isAuthenticated } from './actions/auth';

//components
import Login from './auth/Login';
import Navbar from './components/Navbar';
import Staff from './components/Staff';

const App = () => {
  const { user } = isAuthenticated();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route exact path='/staff' element={<Staff />} /> */}
        <Route exact path='/' element={user ? <Staff /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
