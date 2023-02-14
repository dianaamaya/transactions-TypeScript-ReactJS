import { useMemo, useContext } from "react"
import moment from "moment-timezone"
import { TransactionContext } from "../context/TransactionsProvider"
import { TransactionType, REDUCER_ACTION_TYPE, ReducerActionType, ReducerAction } from "../context/contextTypes"
import { plnCurrency } from "../utilities/currencyFormat"

type UseTransactionType = {
	balance: string,
    pagination: number,
    transactions: TransactionType[],
	dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,
    transactionsQty: number
}

const useTransactions = (): UseTransactionType => {

    const { search, pagination, transactions, dispatch } = useContext(TransactionContext)

    const REDUCER_ACTIONS = useMemo((): ReducerActionType => {
        return REDUCER_ACTION_TYPE
    }, [])

    const balance = useMemo((): string => {
		return plnCurrency(transactions.reduce((previousValue, transactionItem) => {
            return previousValue + transactionItem.amount
        }, 0)) 
    }, [transactions])

	const filteredTransactions = useMemo((): TransactionType[] => {
    
		const currentTransactions: TransactionType[] = search 
		? transactions.filter(transaction => 
			((transaction.beneficiary).toLowerCase()).includes(search.toLocaleLowerCase()))
		: transactions

        return currentTransactions.sort((a, b) => moment(b.date).diff(moment(a.date)))
	}, [search, transactions]) 

	const transactionsInPage = useMemo((): TransactionType[] => {
		const initialPosition: number = 20 * (pagination - 1)

		return filteredTransactions.slice(initialPosition, initialPosition + 20)
	}, [filteredTransactions, pagination]) 
	
    return { 
		dispatch, 
		REDUCER_ACTIONS, 
		balance, 
		transactions: transactionsInPage,
		pagination, 
		transactionsQty: filteredTransactions.length
	}
}

export default useTransactions