import axios from 'axios';

export const getDepartments = async () =>
  await axios.get(`${process.env.REACT_APP_API}/departments`);
