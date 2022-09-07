import axios from 'axios';

export const getStaff = async () =>
  await axios.get(`${process.env.REACT_APP_API}/staff`);

export const addNewStaff = async (staff) =>
  await axios.post(`${process.env.REACT_APP_API}/add`, staff);

export const deleteStaff = async (staffId) =>
  await axios.post(`${process.env.REACT_APP_API}/delete/${staffId}`);

export const editStaff = async (staffId, data, token) =>
  await axios.put(`${process.env.REACT_APP_API}/update/${staffId}`, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
