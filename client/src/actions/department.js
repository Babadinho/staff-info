import axios from 'axios';

export const getDepartments = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/departments`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

export const getDepartment = async (department_id, token) =>
  await axios.get(`${process.env.REACT_APP_API}/department/${department_id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
