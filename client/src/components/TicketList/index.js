import React, { useState } from "react";
import { UPDATE_TICKET, } from '../../utils/mutations'
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_TICKETS2 } from "../../utils/queries";
import FileDownload from "../FileDownload";

const TicketList = ({ tickets, refetch }) => {
  const [formState, setFormState] = useState({
    _id: '',
    status: ''
  });

const [updateTicket] = useMutation(UPDATE_TICKET)

  const handleChange = async (event, _id) => {
    // const { name, value } = event.target;

    // setStatus({
    //   ...status,
    //   [name]: value,
    // });

    // targets the dropdown options
    const index = event.target.selectedIndex
    const status = event.target.options[index].textContent

    setFormState({status, _id})


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
        <h3 className="ticket-title">{ticket.title} Status: {ticket.status}</h3>
        <h3 className="ticket-title">Update Status</h3>
        <form onSubmit={handleFormSubmit}>
          <input value={ticket._id} name='_id'></input>
          <select name="status" onChange={(e)=>handleChange(e, ticket._id)}>

            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          <button type='submit'>Change Status</button>
        </form>

        <div className="card mb-3">
          <p className="ticket-header">
            Unit: {ticket.unit} | {JSON.stringify(ticket.isPrivate)}
            <br />
            Ticket on {ticket.createdAt}
          </p>
          <div className="card-body">
            <p>{ticket.message}</p>
            <p className="mb-0">
              Comment: {ticket.commentCount} || Click to{" "}
              {ticket.imageName ? <FileDownload imageName={ticket.imageName} imagePrefix={ticket._id}></FileDownload> : ""}
              {ticket.commentCount ? "see" : "start"} the discussion!
            </p>
          </div>
        </div>
      </div>
    ))
    }
  </div>
);
};

export default TicketList;
