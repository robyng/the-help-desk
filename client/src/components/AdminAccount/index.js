import React from "react";
import { QUERY_ALL_USERS, QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import AllUsers from '../AllUsers';

function AdminAccount() {
  //for listing user that is logged in
  const { data: userData, error } = useQuery(QUERY_ME);
  const user = userData?.me || { _id: '', unit: '', email: '' }

  //for listing all users
  const { loading, error2, data, refetch } = useQuery(QUERY_ALL_USERS);
  const listUser = data?.users || []

  if (error || error2)
    throw new Error("Error in graph ql : " + error + error2)


  return (
    <div>

      <h1>Manager account</h1>
      <h3>{user.email}</h3>
      <br />
      <h2>List of residents:</h2>
      {loading ? (
        <div>loading</div>
      ) : (
        <AllUsers listUser={listUser} refetch={refetch} />

      )}

    </div>
  );

}

export default AdminAccount;