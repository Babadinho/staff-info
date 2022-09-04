const LoginForm = ({ username, password, handleChange, handleSubmit }) => {
  return (
    <>
      <div className='container'>
        <div className='row justify-content-center mt-5'>
          <div className='col-lg-10 col-md-10 col-sm-12'>
            <div className='card shadow'>
              <div className='card-title text-center border-bottom'>
                <h2 className='p-3'>Login</h2>
              </div>
              <div className='card-body'>
                <form onSubmit={handleSubmit} className='px-3'>
                  <div className='mb-2'>
                    <label htmlFor='username' className='form-label'>
                      Username
                    </label>
                    <input
                      onChange={handleChange('username')}
                      type='text'
                      className='form-control rounded-0'
                      id='username'
                      value={username}
                    />
                  </div>
                  <div className='mb-4'>
                    <label htmlFor='password' className='form-label'>
                      Password
                    </label>
                    <input
                      onChange={handleChange('password')}
                      type='password'
                      className='form-control rounded-0'
                      id='password'
                      value={password}
                    />
                  </div>
                  <div className='d-grid mb-5'>
                    <button
                      type='submit'
                      className='btn btn-dark btn-lg rounded-0'
                    >
                      Login
                    </button>
                  </div>
                  <div>
                    {' '}
                    <span>
                      <strong>User:</strong> Username: user | Password: user
                    </span>
                  </div>
                  <div>
                    <span>
                      <strong>Admin:</strong> Username: admin | Password: admin
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
