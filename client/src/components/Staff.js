import React, { useState, useEffect } from 'react';
import { getDepartments } from '../actions/department';
import { getStaff } from '../actions/staff';
import AddStaff from './AddStaff';

const Staff = () => {
  const [departments, setDepartments] = useState();
  const [staff, setStaff] = useState();
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useState({
    staff_name: '',
    staff_email: '',
    staff_phone: '',
    staff_image: '',
    department: '',
  });

  const loadDepartments = async () => {
    const res = await getDepartments();
    setDepartments(res.data);
  };

  const loadStaff = async () => {
    const res = await getStaff();
    setStaff(res.data);
  };

  useEffect(() => {
    loadDepartments();
    loadStaff();
  }, [success]);

  return (
    <div className='container'>
      <div className='container mt-5 d-flex align-items-center justify-content-between mb-5'>
        <div className='dropdown'>
          <button
            className='btn btn-dark dropdown-toggle rounded-0'
            type='button'
            data-bs-toggle='dropdown'
            aria-expanded='false'
          >
            Select Department
          </button>
          <ul className='dropdown-menu'>
            {departments &&
              departments.length > 0 &&
              departments.map((department, i) => {
                return (
                  <li key={i}>
                    <a
                      className='dropdown-item'
                      href={department.department_id}
                    >
                      {department.department_name}
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
        <AddStaff
          departments={departments}
          values={values}
          setValues={setValues}
          success={success}
          setSuccess={setSuccess}
        />
      </div>
      <div className='row'>
        {staff &&
          staff.length > 0 &&
          staff.map((s, i) => {
            return (
              <div className='col-md-4 col-lg-3 col-sm-12 mb-4'>
                <div class='card rounded-0' key={i}>
                  <img
                    src={s.staff_image}
                    class='card-img-top'
                    alt='staff_image'
                    style={{ height: '250px' }}
                  />
                  <div class='card-body'>
                    <h5 class='card-title'>{s.staff_name}</h5>
                    <p class='card-text'>{s.department_name}</p>
                    <p>{s.staff_phone}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Staff;
