import React from "react";
import { QUERY_ALL_USERS, QUERY_ME, QUERY_USER } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import AllUsers from  '../AllUsers';

function AdminAccount() {
  //for listing user that is logged in
  const { data: userData, error } =  useQuery(QUERY_ME);
  const user = userData?.me || {_id:'', unit: '', email: '' }

  //for listing all users
  const { loading, error2, data, refetch  } = useQuery(QUERY_ALL_USERS);
  const listUser = data?.users || [] //{_id:'', unit: '', email: '' }


  // let error = null // take out if using queryme again
  if (error || error2)
  throw new Error ("Error in graph ql : " + error + error2)


// console.log('users:' + JSON.stringify(users))
console.log('listUser: '+ JSON.stringify(listUser))

    // if (!allUsers || !allUsers.length) {
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
      {loading ? (
        <div>loading</div>
      ): (
        <AllUsers listUser={listUser} refetch ={refetch} />

      )}

      

      
      
    </div>
  );
  
}

export default AdminAccount;
