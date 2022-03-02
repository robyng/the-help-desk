import React, { useState } from "react";
import { UPDATE_TICKET, } from '../../utils/mutations'
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_TICKETS2 } from "../../utils/queries";
import FileDownload from "../FileDownload";
import key from '../../assets/images/pexels-kehn-hermano-5962574.jpg';
const TicketList = ({ tickets, refetch }) => {
  const [formState, setFormState] = useState({
    _id: '',
    status: ''
  });

  const [updateTicket] = useMutation(UPDATE_TICKET)

  const handleChange = async (event, _id) => {

    // targets the dropdown options
    const index = event.target.selectedIndex
    const status = event.target.options[index].textContent

    setFormState({ status, _id })


  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(formState)
      const { data } = await updateTicket({
        variables: { ...formState },
      });
      refetch()

    } catch (e) {
      console.error(e);
    }
  };



  //Show all tickets
  //const { loading, data } = useQuery(QUERY_TICKETS2);
  //const tickets = data?.getTickets || [];

  if (!tickets || !tickets.length) {
    return <h3>No Ticket Yet</h3>;
  }
  //console.log(`tickets ` + JSON.stringify(data))



  return (

    <div>
      {tickets && tickets.map((ticket) => (
        <div key={ticket._id}>
          <div className="card ticket">
            <div className="ticket-header">
              <h3 className="ticket-title">Issue: {ticket.title}</h3>
              <h5 > Status: {ticket.status}</h5>
              <form onSubmit={handleFormSubmit}>
                {/* <input value={ticket._id} name='_id'></input> */}
                
                <select name="status" onChange={(e) => handleChange(e, ticket._id)}>
                  <option value="blank">Status...</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
                <button type='submit'>Change Status</button>
              
              </form>
              <br />
              <h5>
              Unit: {ticket.unit}
              <br />
              Category: {ticket.category}
              {/* {JSON.stringify(ticket.isPrivate)} */}
              <br />
              Submitted on {ticket.createdAt}
              </h5>
            </div>
            <div className="card-body">
              <p>{ticket.message}</p>
              <div className="image-size">
                <img src={key} alt="github" />
                {/* Comment: {ticket.commentCount} || Click to{" "} */}
                {ticket.imageName ? <FileDownload imageName={ticket.imageName} imagePrefix={ticket._id} ></FileDownload> : ""}
                {/* {ticket.commentCount ? "see" : "start"} the discussion! */}
              </div>
            </div>
          </div>
        </div>
      ))
      }
    </div>
  );
};

export default TicketList;
