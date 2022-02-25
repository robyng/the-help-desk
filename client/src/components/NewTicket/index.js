import React from "react";
// import TicketList from "../TicketList/index.js";

function NewTicket() {
  return (
    <div className='container-fluid'>
    <div className='row justify-content-evenly'>
      <div className='login-card col-4'>
        <form className='form login-form'>
          <div className='form-group'>
            <label for='title'>Title:</label>
            <input className='form-input' type='text' id='title' />
          </div>
          <div className='form-group'>
            <label for='message'>Message:</label>
          </div>
          <textarea
        
          className="form-input col-12 col-md-12"
          
        ></textarea>
          <div className='form-group'>
            <button className='btn' type='submit'>Submit</button>
          </div>
        </form>
      </div>
  
      
    </div>
  </div>
  );
}

export default NewTicket;
