import React from "react";
import { QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/client';


function Account() {
  
  const { data, error } =  useQuery(QUERY_ME);
  const user = data?.me || {_id:'', unit: '', email: '' }

  return (
    <div>
      <h1>Your Account Info</h1>
      <div key={user._id}></div>
      <h3>Unit: {user.unit}</h3>
      <h3>Email: {user.email}</h3>     
    </div>
  );
}

export default Account;
