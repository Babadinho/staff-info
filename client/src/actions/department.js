import axios from 'axios';

export const getDepartments = async () =>
  await axios.get(`https://staff-info.herokuapp.com/departments`);

export const getDepartment = async (department_id) =>
  await axios.get(
    `https://staff-info.herokuapp.com/department/${department_id}`
  );
