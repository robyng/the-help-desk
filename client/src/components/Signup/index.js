import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

function Signup() {
  const [formState, setFormState] = useState({
    unit: '',
    email: '',
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.saveInfo(data.addUser.user)
      Auth.login(data.addUser.token);

    } catch (e) {
      console.error(e);
    }
  };
  return (
        <div className='signup-card col-lg-4 col-md-10 container'>
          <form className='form signup-form' onSubmit={handleFormSubmit}>
            <div className='form-group'>
              <h3>Sign Up</h3>
              <h3>For Demos, use Units in the 300s.</h3>
              <label htmlFor='unit-signup'>Unit:</label>
              <input className='form-input' type='number' id='unit-signup' name="unit" value={formState.unit} onChange={handleChange} />
            </div>
            <div className='form-group'>
              <label htmlFor='email-signup'>Email:</label>
              <input className='form-input' type='text' id='email-signup' name="email" value={formState.email} onChange={handleChange} />
            </div>
            <div className='form-group'>
              <label htmlFor='password-signup'>Password:</label>
              <input className='form-input' type='password' id='password-signup' name="password" value={formState.password} onChange={handleChange} />
            </div>
            <div className='form-group'>
              <button className='btn' type='submit'>Signup</button>
            </div>
          </form>
          {error && <div><h1>Signup failed: {error.name}</h1></div>}
        </div>
  );
}

export default Signup;