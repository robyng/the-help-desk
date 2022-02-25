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
            <div>
            <div class="container mt-12" >
      <label className="col-sm-8" >
        Category:
        <select className="col-sm-8"  >
          <option value="plumbing">Plumbing</option>
          <option value="eletrical">Eletrical</option>
          <option value="cleaning">Cleaning</option>
          <option value="financial">Financial</option>
          <option value="socialareas">Social Areas</option>
        </select>
        <div>
      <label>
        <input type="checkbox" />
        Private
      </label>
    </div>
      </label>
    </div>
    </div>
          </div>
        </form>
      </div>
  
      
    </div>
  </div>
  );
}

export default NewTicket;
