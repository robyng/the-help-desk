import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      //setItem user to localStorage 
      Auth.saveInfo(data.login.user)
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (

    <div className='login-card col-lg-4 col-md-10 container'>
      <form onSubmit={handleFormSubmit}className='form login-form'>
        <div className='form-group'>
          <h3>Login</h3>
          <h4>To Demo Property Manager Role, use email: robyn@site-reworks.com pass: PropertyHelpDesk</h4>
          <label htmlFor='email-login'>Email:</label>
          <input className='form-input' type='text' id='email-login' name="email" value={formState.email} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='password-login'>Password:</label>
          <input className='form-input' type='password' id='password-login' name="password" value={formState.password} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <button className='btn' type='submit'>Login</button>
        </div>
      </form>
      {error && <div>Login failed</div>}
    </div>
  );
}

export default Login;