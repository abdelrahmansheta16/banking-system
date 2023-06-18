import { gql } from "@apollo/client";

export const newTransaction = gql`
mutation AddTransaction($transaction: TransactionInput!) {
  addTransaction(transaction: $transaction) {
    amount
    date
    id
    recieverId
    senderId
    status
  }
}
`