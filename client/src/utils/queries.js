import { gql } from '@apollo/client';

export const QUERY_ADMIN_TICKETS = gql`
query adminAllTickets {
    tickets {
      _id
      message
      unit
      createdAt
      status
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

export const QUERY_TICKETS2 = gql`
query getTickets2($searchForUnit: String, $myUnit: String, $searchMyTickets: Boolean){
  getTickets2(searchForUnit: $searchForUnit, myUnit: $myUnit, searchMyTickets: $searchMyTickets) {
    _id
    unit
    message
    createdAt
    isPrivate
    imageName
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

export const QUERY_TICKET = gql`
query getTicketById($id: ID!) {
    ticket(_id:$id) {
      _id
      unit
      message
      createdAt
      status
      isPrivate
      imageName
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