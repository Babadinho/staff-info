import axios from 'axios';

export const getDepartments = async () =>
  await axios.get(`${process.env.REACT_APP_API}/departments`);

export const getDepartment = async (department_id) =>
  await axios.get(`${process.env.REACT_APP_API}/department/${department_id}`);
