import React from 'react';
import { isAuthenticated } from '../actions/auth';

const Navbar = () => {
  const { user } = isAuthenticated();

  const handleLogout = () => {
    window.localStorage.removeItem('staff-info');
    window.location.reload();
  };

  return (
    <div>
      <nav className='navbar bg-dark'>
        <div className='container-fluid'>
          <span className='navbar-brand mb-0 h1 text-white'>
            Staff Information
          </span>
          {user && (
            <span
              className='navbar-brand mb-0 h1 text-white'
              role='button'
              onClick={handleLogout}
            >
              Logout
            </span>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
