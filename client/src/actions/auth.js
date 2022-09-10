import axios from 'axios';

export const login = async (user) =>
  await axios.post(`${process.env.REACT_APP_API}/login`, user);

export const authenticate = (data) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('staff-info', JSON.stringify(data));
  }
};

export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('staff-info')) {
    return JSON.parse(localStorage.getItem('staff-info'));
  } else {
    return false;
  }
};
