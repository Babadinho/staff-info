import React, { useState, useEffect } from 'react';
import { getDepartments } from '../actions/department';
import { getStaff } from '../actions/staff';
import AddStaff from './AddStaff';
import Select from 'react-select';

const Staff = () => {
  const [departments, setDepartments] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
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

  const options = [
    { value: 1, label: 'Human Resources' },
    { value: 2, label: 'Accounting and Finance' },
    { value: 3, label: 'Marketing' },
    { value: 4, label: 'Production' },
    { value: 5, label: 'IT' },
  ];

  useEffect(() => {
    loadDepartments();
    loadStaff();
  }, [success]);

  return (
    <div className='container'>
      <div className='container mt-5 d-flex align-items-center justify-content-between mb-5 flex-column'>
        <div className='mb-4'>
          <Select
            isMulti
            placeholder='Select Department'
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div>
          <AddStaff
            departments={departments}
            values={values}
            setValues={setValues}
            success={success}
            setSuccess={setSuccess}
          />
        </div>
        {/* <div className='dropdown'>
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
        </div> */}
      </div>
      <div className='row'>
        {staff &&
          staff.length > 0 &&
          staff.map((s, i) => {
            return (
              <div className='col-md-4 col-lg-3 col-sm-12 mb-4' key={i}>
                <div className='card rounded-0'>
                  <img
                    src={s.staff_image}
                    className='card-img-top'
                    alt='staff_image'
                    style={{ height: '250px' }}
                  />
                  <div className='card-body'>
                    <h5 className='card-title'>{s.staff_name}</h5>
                    <p className='card-text'>{s.department_name}</p>
                    <div className='d-flex justify-content-between'>
                      <p>
                        <i className='fa-solid fa-mobile pe-2'></i>
                        {s.staff_phone}
                      </p>
                      <div>
                        <span className='badge text-bg-warning me-2'>Edit</span>
                        <span className='badge text-bg-danger'>Delete</span>
                      </div>
                    </div>
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
