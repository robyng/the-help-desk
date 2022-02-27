import React from "react";

import { useQuery } from "@apollo/client";
import { QUERY_TICKETS2 } from "../../utils/queries";
import FileUpload from "../FileUpload";
import FileDownload from "../FileDownload";

const TicketList = () => {
  //Show all tickets
  const { loading, data } = useQuery(QUERY_TICKETS2);

  const tickets = data?.getTickets2 || [];

  if (!tickets) {
    return <h3>No Ticket Yet</h3>;
  }
  console.log("Tickets: " + JSON.stringify(data));
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
                Unit: {ticket.unit}
                <br />
                Ticket on {ticket.createdAt}
              </p>
              <div className="card-body">
                <p>{ticket.message}</p>
                <p className="mb-0">
                  {ticket.imageName ? (
                    <FileDownload imageName={ticket.imageName} />
                  ) : (
                    ""
                  )}
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
