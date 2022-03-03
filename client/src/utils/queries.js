import { gql } from '@apollo/client';

export const QUERY_TICKETS2 = gql`
query getTickets($searchMyTickets: Boolean, $unit: String, $searchForUnit: String){
  getTickets(searchMyTickets: $searchMyTickets, unit: $unit, searchForUnit: $searchForUnit){
    _id
      message
      unit
      createdAt
      status
      category
      isPrivate
      title
      imageName
      comments {
        message
        _id
        unit
        createdAt
      }
  }
}
`;

export const QUERY_TICKETS = gql`
query getAllTickets {
    tickets {
      _id
      message
      unit
      createdAt
      status
      isPrivate
      title
      comments {
        message
        _id
        unit
        createdAt
      }
      
    }
  }  
`;

export const QUERY_TICKET = gql`
query getTicketById($id: ID!) {
    ticket(_id:$id) {
      _id
      unit
      message
      createdAt
      status
      isPrivate
      comments {
        _id
        unit
        message
      }
    }
  }
  
`;

export const QUERY_ME = gql`
query me{
    me {
      _id
      unit
      email
      tickets {
        _id
        message
        createdAt
        comments {
          _id
          createdAt
          message
          unit
        }
      }
       
    } 
  }
`;

export const QUERY_USER = gql`
query user($email: String!){
    user(email: $email){
      _id
      unit
      email
      
  }
}
`;

export const QUERY_ALL_USERS = gql`
query allUsers{
  users {
    _id
    email
    unit
  }
}`