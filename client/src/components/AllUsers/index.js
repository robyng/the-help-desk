import React from "react";
import { QUERY_ALL_USERS } from '../../utils/queries';
import { useMutation, useQuery } from '@apollo/client';
import {DELETE_USER} from '../../utils/mutations'

const AllUsers = ( {listUser, refetch} ) => {

  const [deleteUser] = useMutation(DELETE_USER);

  // submit form
  const handleFormSubmit = async (event, _id) => {
    event.preventDefault();

    try {

      const { data } = await deleteUser({
        variables: { _id },
      });
      console.log(data)
refetch() 
    } catch (e) {
      console.error(e);
    }


  };
    

    //   const { data, error } =  useQuery(QUERY_ME);
    //   const user = data?.me || {_id:'', unit: '', email: '' }

  //  const { data2, error2 } = useQuery(QUERY_ALL_USERS);
  //  const allUsers = data2?.allUsers || [] //{ _id: '', unit: '', email: '' }

  //  if ( error2)
  //      throw new Error ("Error in graph ql : " + error2)

    // if (!users || !users.length) {
    //     return <h3>No Users Yet</h3>;
    //   }


    return (
<div>
    {listUser && listUser.map((user) => (
 

 <div key={user._id}  >

   <div >Email: {user.email}</div>


<h3>Unit: {user.unit}</h3>
<h3>ID: {user._id}</h3>
<button type='submit' onClick={(e) => {handleFormSubmit(e, user._id)} }>Delete</button>
   </div>      


      
    ))
    }
  </div>
    );
}

export default AllUsers;
