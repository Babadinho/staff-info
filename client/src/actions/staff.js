import axios from 'axios';

export const getStaff = async () =>
  await axios.post(`https://staff-info.herokuapp.com/staff`);

export const addNewStaff = async (staff) =>
  await axios.post(`https://staff-info.herokuapp.com/add`, staff);

export const deleteStaff = async (staffId) =>
  await axios.post(`https://staff-info.herokuapp.com/delete/${staffId}`);

export const editStaff = async (staffId, data, token) =>
  await axios.put(`https://staff-info.herokuapp.com/update/${staffId}`, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
