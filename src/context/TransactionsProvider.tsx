import { useMemo, useReducer, createContext, ReactElement } from "react"
import moment from "moment-timezone"
import { ADD, REMOVE, FILTER, CHANGE_PAGINATION, SET_DATA, SET_MESSAGE } from "./reducerTypes"
import { TransactionItemType, TransactionStateType, ReducerAction, message } from "./types"

const initTransactionState: TransactionStateType = { 
	search: "", 
	pagination: 1,
	transactions: [],
    message: { type:"success", msg: ""},
}

const REDUCER_ACTION_TYPE = { 
    ADD, 
    REMOVE, 
    FILTER, 
    CHANGE_PAGINATION, 
    SET_DATA, 
    SET_MESSAGE
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

const reducer = (state: TransactionStateType, action: ReducerAction): TransactionStateType => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.ADD: {
			
            if (action?.payload?.transaction === undefined) {
                throw new Error('action.payload missing in ADD action')
            }

            const { id, amount, beneficiary, account, address, date, description  } = action.payload.transaction

            return { ...state,  
				pagination: 1,
                transactions: [ ...state.transactions, { id, amount, beneficiary, account, address, date, description}]
            }
        }
        case REDUCER_ACTION_TYPE.REMOVE: {
            if (action?.payload?.transactionId === undefined) {
                throw new Error('action.payload missing in REMOVE action')
            }

            const { transactionId } = action.payload
            const filteredTransaction: TransactionItemType[] = state.transactions.filter(item => item.id !== transactionId)

            return { ...state, transactions: [...filteredTransaction], pagination: 1 }
        }

		case REDUCER_ACTION_TYPE.FILTER: {
            if (action?.payload?.search === undefined) {
                throw new Error('action.payload missing in FILTER action')
            }

            const { search } = action.payload

            return { ...state, search: search, pagination: 1 }
        }

		case REDUCER_ACTION_TYPE.CHANGE_PAGINATION: {
            if (action?.payload?.pagination === undefined) {
                throw new Error('action.payload missing in CHANGE_PAGINATION action')
            }

            const { pagination } = action.payload

            return { ...state, pagination: pagination }
        }

		case REDUCER_ACTION_TYPE.SET_DATA: {
            if (action?.payload?.transactionsList === undefined) {
                throw new Error('action.payload missing in CHANGE_PAGINATION action')
            }

            const { transactionsList } = action.payload

            return { ...state, transactions: [...transactionsList] }
        }

        case REDUCER_ACTION_TYPE.SET_MESSAGE: {
            if (action?.payload?.message === undefined) {
                throw new Error('action.payload missing in CHANGE_PAGINATION action')
            }

            const { message } = action.payload

            return { ...state, message: message }
        }
        default:
            throw new Error('Unidentified reducer action type')
    }
}

const useTransactionContext = () => {

	const [state, dispatch] = useReducer(reducer, initTransactionState)

    const REDUCER_ACTIONS = useMemo((): ReducerActionType => {
        return REDUCER_ACTION_TYPE
    }, [])

    const balance = useMemo((): string => {
		return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(
			state.transactions.reduce((previousValue, transactionItem) => {
            return previousValue + transactionItem.amount
        }, 0)
    )}, [state.transactions])

	const transactions = useMemo((): TransactionItemType[] => {
        return state.transactions.sort((a, b) => moment(b.date).diff(moment(a.date)))
    }, [state.transactions])

	const filteredTransactions = useMemo((): TransactionItemType[] => {
		return state.search 
		? transactions.filter(transaction => 
			((transaction.beneficiary).toLowerCase()).includes(state.search.toLocaleLowerCase()))
		: transactions
	}, [state.search, transactions]) 

    const pagination: number = state.pagination
    const message: message = state.message
    const transactionQty: number = filteredTransactions.length		
	const initialPosition: number = 20 * (pagination - 1)
	const transactionsInPage: TransactionItemType[] = 
        filteredTransactions.slice(initialPosition, initialPosition + 20)
	
    return { 
		dispatch, 
		REDUCER_ACTIONS, 
		balance, 
		transactions: transactionsInPage,
		pagination, 
		transactionsQty: transactionQty,
        message
	}
}

export type UseTransactionContextType = ReturnType<typeof useTransactionContext>

const initTransactionContextState: UseTransactionContextType = {
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    balance: "",
    transactions: [],
	pagination: 1,
	transactionsQty: 0,
    message: { type: "success", msg: ""}
}

const TransactionContext = createContext<UseTransactionContextType>(initTransactionContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const TransactionsProvider = ({ children }: ChildrenType): ReactElement => {
	
    return (<TransactionContext.Provider value={useTransactionContext()}>
            {children}
        </TransactionContext.Provider>
    ) 
}

export default TransactionContext 