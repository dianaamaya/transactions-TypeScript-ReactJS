import { useMemo, useReducer, createContext, ReactElement } from "react"
import moment from "moment-timezone"
import { TransactionType, StateType, ReducerAction, message, REDUCER_ACTION_TYPE, ReducerActionType } from "./contextTypes"

const initState: StateType = { 
	search: "", 
	pagination: 1,
	transactions: [],
    message: { type:"success", msg: ""},
}

const reducer = (state: StateType, action: ReducerAction): StateType => {

    switch (action.type) {

        case REDUCER_ACTION_TYPE.ADD: {

            const { id, amount, beneficiary, account, address, date, description  } = action.payload

            return { ...state,  
				pagination: 1,
                transactions: [ ...state.transactions, { id, amount, beneficiary, account, address, date, description}]
            }
        }
        case REDUCER_ACTION_TYPE.REMOVE: {

            const filteredTransaction: TransactionType[] = state.transactions.filter(item => 
                item.id !== action.payload)

            return { ...state, transactions: [...filteredTransaction], pagination: 1 }
        }

		case REDUCER_ACTION_TYPE.FILTER: {

            return { ...state, search: action.payload, pagination: 1 }
        }

		case REDUCER_ACTION_TYPE.CHANGE_PAGINATION: {

            return { ...state, pagination: action.payload }
        }

		case REDUCER_ACTION_TYPE.SET_DATA: {

            return { ...state, transactions: [...action.payload] }
        }

        case REDUCER_ACTION_TYPE.SET_MESSAGE: {

            return { ...state, message: action.payload }
        }
        default:
            throw new Error('Unidentified reducer action type')
    }
}

const useTransactionContext = () => {

	const [state, dispatch] = useReducer(reducer, initState)

    const REDUCER_ACTIONS = useMemo((): ReducerActionType => {
        return REDUCER_ACTION_TYPE
    }, [])

    const balance = useMemo((): string => {
		return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(
			state.transactions.reduce((previousValue, transactionItem) => {
            return previousValue + transactionItem.amount
        }, 0)
    )}, [state.transactions])

	const transactions = useMemo((): TransactionType[] => {
        return state.transactions.sort((a, b) => moment(b.date).diff(moment(a.date)))
    }, [state.transactions])

	const filteredTransactions = useMemo((): TransactionType[] => {
		return state.search 
		? transactions.filter(transaction => 
			((transaction.beneficiary).toLowerCase()).includes(state.search.toLocaleLowerCase()))
		: transactions
	}, [state.search, transactions]) 

    const pagination: number = state.pagination
    const message: message = state.message
    const transactionQty: number = filteredTransactions.length		
	const initialPosition: number = 20 * (pagination - 1)
	const transactionsInPage: TransactionType[] = 
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
    ...initState,
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    balance: "",
	transactionsQty: 0,
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