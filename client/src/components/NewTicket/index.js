import { useMutation } from "@apollo/client";
import React, {useState} from "react";
import { ADD_TICKET } from "../../utils/mutations";
import { QUERY_TICKETS2, QUERY_ME } from "../../utils/queries";
// import TicketList from "../TicketList/index.js";
import FileUpload from "../FileUpload";
import Auth from '../../utils/auth';
import FileDownload from "../FileDownload";

function NewTicket() {

  const loggedIn = Auth.loggedIn();
 
  const [formState, setFormState] = useState({
    title: 'New Ticket Title',
    message: 'new message',
    category: " ",
    isPrivate: false,
    imageName: " ",
    
  })



  //const [addTicket, {error}] = useMutation(ADD_TICKET)
  const [addTicket, { error }] = useMutation(ADD_TICKET, {
    update(cache, { data: { addTicket } }) {
      try {
        // update tickets array's cache
        // could potentially not exist yet, so wrap in a try/catch
        
        let { getTickets } = cache.readQuery({ query: QUERY_TICKETS2 });
        
        cache.writeQuery({
          query: QUERY_TICKETS2,
          data: { getTickets: [addTicket, ...getTickets] },
        });
      } catch (e) {
        console.error(">>>>>>>> catching error ", e, " | " , error);
      }

      // // update me object's cache
      // const { me } = cache.readQuery({ query: QUERY_ME });
      // cache.writeQuery({
      //   query: QUERY_ME,
      //   data: { me: { ...me, tickets: [...me.tickets, addTicket] } },
      // });
    },
  });
 
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
      console.log("enter try block")
      
      const { data } = await addTicket({
        variables: { ...formState },
      });
     
    } catch (e) {
      console.error(e);
    }
    

  };

  return (
    <div className='container-fluid'>
    <div className='row justify-content-evenly'>
      <div className='login-card col-4'>
        <div>LoggedIn : {JSON.stringify(loggedIn)}</div>
        <form className='form login-form'onSubmit={handleFormSubmit} >
          <div className='form-group'>
            <label htmlFor='title'>Title:</label>
            <input className='form-input' type='text' id='title'  name='title' onChange={handleChange}/>
          </div>
          <div className='form-group'>
            <label htmlFor='message'>Message:</label>
          </div>
          <textarea
          className="form-input col-12 col-md-12"
          onChange={handleChange}
          name="message"
          
        ></textarea>
          <div className='form-group'>
            <button className='btn' type='submit'>Submit</button>
            <div>
            <div className="container mt-12" >
      <label className="col-sm-8" >
        Category:
        <select className="col-sm-8" name="category"  onChange={handleChange}>
          <option value="plumbing" >Plumbing</option>
          <option value="eletrical" >Eletrical</option>
          <option value="cleaning" >Cleaning</option>
          <option value="financial" >Financial</option>
          <option value="socialareas" >Social Areas</option>
        </select>
        <div>
        <label>
          <input type="checkbox" value={true} onChange={handleChange}/>
          Private
        </label>
        <FileUpload></FileUpload>
        
                    
    </div>
      </label>
    </div>
    </div>
          </div>
        </form>
        {error && <div><h1>Creating your ticket failed</h1>{error} </div>}
      </div>
  
      
    </div>
  </div>
  );
}

export default NewTicket;
