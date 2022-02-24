import React from "react";

const TicketList = ({ ticket, title }) => {
  if (!ticket) {
    return <h3>No Ticket Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {ticket &&
        ticket.map((ticket) => (
          <div key={ticket._id} className="card mb-3">
            <p className="card-header">
              {ticket.unit}
              ticket on {ticket.createdAt}
            </p>
            <div className="card-body">
              <p>{ticket.ticketText}</p>
              <p className="mb-0">
                Comment: {ticket.commentCount} || Click to{" "}
                {ticket.commentCount ? "see" : "start"} the discussion!
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TicketList;
