import React from 'react';

function Signup() {
  return (
    <div className='container-fluid'>
  <div className='row justify-content-evenly'>
  <div className='signup-card col-4'>
      <form className='form signup-form'>
        <div className='form-group'>
          <label for='unit-signup'>Unit:</label>
          <input className='form-input' type='number' id='unit-signup' />
        </div>
        <div className='form-group'>
          <label for='email-signup'>Email:</label>
          <input className='form-input' type='text' id='email-signup' />
        </div>
        <div className='form-group'>
          <label for='password-signup'>Password:</label>
          <input className='form-input' type='password' id='password-signup' />
        </div>
        <div className='form-group'>
          <button className='btn' type='submit'>Signup</button>
        </div>
      </form>
    </div>

    
  </div>
</div>
  );
}

export default Signup;


