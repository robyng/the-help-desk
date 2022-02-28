// import { useQuery } from '@apollo/client';
// import { QUERY_TICKET } from '../utils/queries';

// const { id: ticketId } = useParams();

// const { loading, data } = useQuery(QUERY_TICKET, {
//   variables: { id: ticketId }
// });

// const ticket = data?.ticket || {};

// if (loading) {
//   return <div>Loading...</div>;
// }
// return (
//   <div>
//   <div className="card mb-3">
//     <p className="card-header">
//       <span style={{ fontWeight: 700 }} className="text-light">
//         {ticket.unit}
//       </span>{' '}
//       Ticket on {ticket.createdAt}
//     </p>
//     <div className="card-body">
//       <p>{ticket.message}</p>
//     </div>
//   </div>
// </div>
// );

// export default SingleTicket;

import React from 'react';

const SingleTicket = props => {
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            Unit
          </span>{' '}
          ticket on createdAt
        </p>
        <div className="card-body">
          <p>Ticket Text</p>
        </div>
      </div>
    </div>
  );
};

export default SingleTicket;