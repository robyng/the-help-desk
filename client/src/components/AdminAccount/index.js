import React from "react";
import { QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/client';

function AdminAccount() {
  
  const { data, error } =  useQuery(QUERY_ME);
  const user = data?.me || {_id:'', unit: '', email: '' }

    // if (!users || !users.length) {
    //     return <h3>No Users Yet</h3>;
    //   }


  return (
    <div>
      <h1>Your Account Info</h1>
      <div key={user._id}></div>
      <h3>Unit: {user.unit}</h3>
      <h3>Email: {user.email}</h3>
<br/>
      <h2>All Users - if admin</h2>
      
      
    </div>
  );
}

export default AdminAccount;
