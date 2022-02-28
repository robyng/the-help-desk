import React, {useEffect,useState} from 'react';
import TicketList from '../TicketList'

import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_TICKETS2, QUERY_ME } from '../../utils/queries';



function Dashboard() {
    
    const loggedIn = Auth.loggedIn();
    const { data: userData, error2 } =  useQuery(QUERY_ME);
    const { loading, error1, data } = useQuery(QUERY_TICKETS2 );
    console.log("**** user Data" + JSON.stringify(userData))

    //const tickets = userData?.me.tickets || [];
    const tickets = data?.getTickets || [];
    if (error1 || error2)
        throw new Error ("Error in graph ql : " + error1 + error2)

        
    return (
        <div>
            <h1>Dashboard</h1>
            <div>LoggedIn : {JSON.stringify(loggedIn)}</div>

            {loading ?   (
                <div>Loading...</div>
            ) : (
                <TicketList
                    tickets={tickets}
                />
            )}
        </div>
    )

}

export default Dashboard;