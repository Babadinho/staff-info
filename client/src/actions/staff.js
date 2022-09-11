import axios from 'axios';

export const getStaff = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/staff`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

export const addNewStaff = async (staff, token) =>
  await axios.post(`${process.env.REACT_APP_API}/add`, staff, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteStaff = async (staffId, token) =>
  await axios.post(`${process.env.REACT_APP_API}/delete`, staffId, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

export const editStaff = async (staff_data, token) =>
  await axios.put(`${process.env.REACT_APP_API}/update`, staff_data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
