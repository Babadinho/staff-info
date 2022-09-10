import axios from 'axios';
import { addNewStaff } from '../actions/staff';
import { message } from 'antd';
import { useState } from 'react';
import { isAuthenticated } from '../actions/auth';

const AddStaff = ({ departments, values, setValues, success, setSuccess }) => {
  const { user } = isAuthenticated();
  const { staff_name, staff_email, staff_phone, staff_image, department } =
    values;
  const [error, setError] = useState('');

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addNewStaff({ values });
      setValues({
        staff_name: '',
        staff_email: '',
        staff_phone: '',
        staff_image: '',
        department: '',
      });
      setSuccess(!success);
      message.success(res.data, 4);
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) {
        setError(err.response.data);
      }
    }
  };

  const generateStaff = () => {
    axios.get('https://randomuser.me/api/').then((data) => {
      setValues({
        staff_name:
          data.data.results[0].name.first +
          ' ' +
          data.data.results[0].name.last,
        staff_email: data.data.results[0].email,
        staff_phone: data.data.results[0].phone,
        staff_image: data.data.results[0].picture.large,
      });
      setError('');
    });
  };

  return (
    <div>
      {user && user.status === 'admin' && (
        <button
          type='button'
          className='btn btn-dark rounded-0 ms-4'
          data-bs-toggle='modal'
          data-bs-target='#exampleModal'
          // onClick={() => setError('')}
        >
          Add New Staff
        </button>
      )}
      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Add New Staff
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <div className='text-danger text-center'>{error}</div>
              <form onSubmit={handleSubmit}>
                <div className='form-group mb-4 col-md-8 mx-auto'>
                  <label className='form-label'>Staff Name</label>
                  <input
                    type='text'
                    className='form-control shadow-none rounded-0'
                    placeholder='Enter staff name'
                    value={staff_name}
                    onChange={handleChange('staff_name')}
                  />
                </div>
                <div className='form-group mb-4 col-md-8 mx-auto'>
                  <label className='form-label'>Staff Email</label>
                  <input
                    type='text'
                    className='form-control shadow-none rounded-0'
                    placeholder='Enter staff email'
                    value={staff_email}
                    onChange={handleChange('staff_email')}
                  />
                </div>
                <div className='form-group mb-4 col-md-8 mx-auto'>
                  <label className='form-label'>Staff Phone</label>
                  <input
                    type='text'
                    className='form-control shadow-none rounded-0'
                    placeholder='Enter staff phone'
                    value={staff_phone}
                    onChange={handleChange('staff_phone')}
                  />
                </div>
                <div className='form-group mb-4 col-md-8 mx-auto'>
                  <label className='form-label'>Staff Image</label>
                  <input
                    type='text'
                    className='form-control shadow-none rounded-0'
                    placeholder='Enter staff name'
                    value={staff_image}
                    onChange={handleChange('staff_image')}
                  />
                </div>
                <div className='form-group mb-4 col-md-8 mx-auto'>
                  <h6>Department</h6>
                  <select
                    className='form-select shadow-none rounded-0'
                    aria-label='Default select example'
                    onChange={handleChange('department')}
                    value={department}
                  >
                    <option></option>
                    {departments &&
                      departments.length > 0 &&
                      departments.map((d, i) => {
                        return (
                          <option key={i} value={d.department_id}>
                            {d.department_name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={generateStaff}
              >
                Auto Generate Details
              </button>
              <button
                id='modal'
                type='button'
                className='btn btn-primary'
                data-bs-dismiss={!error ? 'modal' : ''}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStaff;
