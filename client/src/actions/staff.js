import axios from 'axios';

export const getStaff = async () =>
  await axios.get(`${process.env.REACT_APP_API}/staff`);

export const addNewStaff = async (staff) =>
  await axios.post(`${process.env.REACT_APP_API}/add`, staff);
