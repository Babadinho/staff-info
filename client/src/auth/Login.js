import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { login, authenticate } from '../actions/auth';
import { message } from 'antd';

const Login = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const { username, password } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({
        username: username,
        password: password,
      });
      if (data) {
        //Save user and token to LocalSTorage
        authenticate(data);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) message.error(err.response.data, 4);
    }
  };

  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-10 col-lg-6 col-sm-11 mx-auto'>
            <LoginForm
              username={username}
              password={password}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
