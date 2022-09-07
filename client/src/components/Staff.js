import React, { useState, useEffect } from 'react';
import { getDepartments } from '../actions/department';
import { getStaff, deleteStaff } from '../actions/staff';
import AddStaff from './AddStaff';
import EditStaff from './EditStaff';
import Select from 'react-select';
import { Popconfirm, message } from 'antd';

const Staff = () => {
  const [departments, setDepartments] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [staff, setStaff] = useState();
  const [edit, setEdit] = useState('');
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

  const handleDelete = async (staffId) => {
    try {
      const res = await deleteStaff(staffId);
      message.success(res.data, 4);
      setSuccess(!success);
    } catch (err) {
      if (err.response.status === 400) {
        message.error(err.response.data, 4);
      }
    }
  };

  useEffect(() => {
    loadDepartments();
    loadStaff();
  }, [success]);

  return (
    <div className='container'>
      <div className='container mt-5 row'>
        <div className='mb-4 col-md-8 col-sm-12 d-flex'>
          <Select
            isMulti
            placeholder='Select Department'
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div className='col-md-4 col-sm-12 d-md-flex justify-content-end mb-4'>
          <AddStaff
            departments={departments}
            values={values}
            setValues={setValues}
            success={success}
            setSuccess={setSuccess}
          />
          <EditStaff
            departments={departments}
            values={values}
            edit={edit}
            setValues={setValues}
            success={success}
            setSuccess={setSuccess}
          />
        </div>
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
                        <span
                          className='badge text-bg-warning me-2'
                          role='button'
                          data-bs-toggle='modal'
                          data-bs-target='#exampleModal2'
                          onClick={() => setEdit(s)}
                        >
                          Edit
                        </span>
                        <span className='badge text-bg-danger' role='button'>
                          <Popconfirm
                            placement='top'
                            title='Delete this staff?'
                            onConfirm={() => handleDelete(s.staff_id)}
                            okText='Yes'
                            cancelText='No'
                          >
                            Delete
                          </Popconfirm>
                        </span>
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
