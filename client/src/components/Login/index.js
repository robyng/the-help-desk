import React from 'react';

function Login() {
  return (
    <div className='container-fluid'>
  <div className='row justify-content-evenly'>
    <div className='login-card col-4'>
      <form className='form login-form'>
        <div className='form-group'>
          <label for='email-login'>Email:</label>
          <input className='form-input' type='text' id='email-login' />
        </div>
        <div className='form-group'>
          <label for='password-login'>Password:</label>
          <input className='form-input' type='password' id='password-login' />
        </div>
        <div className='form-group'>
          <button className='btn' type='submit'>Login</button>
        </div>
      </form>
    </div>

    
  </div>
</div>
  );
}

export default Login;