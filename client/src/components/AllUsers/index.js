import React from "react";
import { QUERY_ALL_USERS } from '../../utils/queries';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_USER } from '../../utils/mutations'

const AllUsers = ({ listUser, refetch }) => {

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

  return (
    <div>
      {listUser && listUser.map((user) => (

        <div key={user._id}  >

          <div className="card ticket">
            <div className="card-body">

            <h4>Unit: {user.unit}</h4>
            <h4>Email: {user.email}</h4>
            <h6>ID: {user._id}</h6>

            <button className="btn btn-danger" type='submit' value='submit' onClick={(e) => { handleFormSubmit(e, user._id) }}>Delete</button>
            </div>
          </div>

        </div>

      ))
      }
    </div>
  );
}

export default AllUsers;
