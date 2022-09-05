import axios from 'axios';

export const getStaff = async () =>
  await axios.get(`${process.env.REACT_APP_API}/staff`);
