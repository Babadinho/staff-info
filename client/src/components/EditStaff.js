import { editStaff } from '../actions/staff';
import { message } from 'antd';
import { useState } from 'react';
import { isAuthenticated } from '../actions/auth';

const EditStaff = ({ departments, edit, success, setSuccess }) => {
  const { token } = isAuthenticated();

  const [values, setValues] = useState({
    staff_name: '',
    staff_email: '',
    staff_phone: '',
    staff_image: '',
    department: '',
  });
  const { staff_name, staff_email, staff_phone, staff_image, department } =
    values;
  const [error, setError] = useState('');

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await editStaff(edit && edit.staff_id, { values, token });
      setSuccess(!success);
      setError('');
      message.success(res.data, 4);
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) {
        setError(err.response.data);
      }
    }
  };

  return (
    <div>
      <div
        className='modal fade'
        id='exampleModal2'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Edit Staff
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
                    value={staff_name ? staff_name : edit && edit.staff_name}
                    onChange={handleChange('staff_name')}
                  />
                </div>
                <div className='form-group mb-4 col-md-8 mx-auto'>
                  <label className='form-label'>Staff Email</label>
                  <input
                    type='text'
                    className='form-control shadow-none rounded-0'
                    placeholder='Enter staff email'
                    value={staff_email ? staff_email : edit && edit.staff_email}
                    onChange={handleChange('staff_email')}
                  />
                </div>
                <div className='form-group mb-4 col-md-8 mx-auto'>
                  <label className='form-label'>Staff Phone</label>
                  <input
                    type='text'
                    className='form-control shadow-none rounded-0'
                    placeholder='Enter staff phone'
                    value={staff_phone ? staff_phone : edit && edit.staff_phone}
                    onChange={handleChange('staff_phone')}
                  />
                </div>
                <div className='form-group mb-4 col-md-8 mx-auto'>
                  <label className='form-label'>Staff Image</label>
                  <input
                    type='text'
                    className='form-control shadow-none rounded-0'
                    placeholder='Enter staff name'
                    value={staff_image ? staff_image : edit && edit.staff_image}
                    onChange={handleChange('staff_image')}
                  />
                </div>
                <div className='form-group mb-4 col-md-8 mx-auto'>
                  <h6>Department</h6>
                  <select
                    className='form-select shadow-none rounded-0'
                    aria-label='Default select example'
                    onChange={handleChange('department')}
                    value={department ? department : edit && edit.department}
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
                id='modal'
                type='button'
                className='btn btn-primary'
                data-bs-dismiss={!error && 'modal'}
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

export default EditStaff;
