import { useContext } from "react"
import TransactionContext from "../context/TransactionsProvider"
import { UseTransactionContextType } from "../context/TransactionsProvider"

const useTransactions = (): UseTransactionContextType => {
    return useContext(TransactionContext)
}

export default useTransactions