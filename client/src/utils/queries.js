import { gql } from '@apollo/client';

export const QUERY_TICKETS = gql`
query getAllTickets {
    tickets {
      _id
      message
      unit
      createdAt
      status
      isPrivate
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
query User{
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