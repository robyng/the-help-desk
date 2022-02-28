import React from "react";

import { useQuery } from "@apollo/client";
import { QUERY_TICKETS } from "../../utils/queries";
import { Link, BrowserRouter } from 'react-router-dom';
const TicketList = () => {
  //Show all tickets
  const { loading, data } = useQuery(QUERY_TICKETS);

  const tickets = data?.tickets || [];

  if (!tickets) {
    return <h3>No Ticket Yet</h3>;
  }

  return (
    <div>
      {loading ? (
        <div>Loading..</div>
      ) : (
        tickets.map((ticket) => (
          <div>
            <h3 className="ticket-title">{ticket.title}</h3>
            <div key={ticket._id} className="card mb-3">
              <p className="ticket-header">

              <BrowserRouter>
              <Link
    to={`/account/${ticket.unit}`}
    style={{ fontWeight: 700 }}
    className="text-light"
  >
    {ticket.unit}
  </Link>{' '}
  ticket on {ticket.createdAt}
  </BrowserRouter>
 
{/*                   
                Unit: {ticket.unit}
                <br />
                Ticket on {ticket.createdAt} */}
              </p>
              <div className="card-body">
                <p>{ticket.message}</p>
                <p className="mb-0">
                  Comment: {ticket.commentCount} || Click to{" "}
                  {ticket.commentCount ? "see" : "start"} the discussion!
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TicketList;
