import { gql } from "@apollo/client";

export const Users = gql`
query Users {
  users {
    currentBalance
    email
    id
    name
    recievedTransactions {
      amount
      date
      id
      recieverId
      senderId
      status
    }
    sentTransactions {
      amount
      date
      id
      recieverId
      senderId
      status
    }
  }
}
`
export const Transactions = gql`
query Transactions {
  transactions {
    amount
    date
    id
    recieverId
    senderId
    status
  }
}
`
export const User = gql`
query User($userId: ID!) {
  user(id: $userId) {
    currentBalance
    email
    id
    name
    recievedTransactions {
      amount
      date
      id
      recieverId
      senderId
      status
    }
    sentTransactions {
      amount
      date
      id
      recieverId
      senderId
      status
    }
  }
}
`