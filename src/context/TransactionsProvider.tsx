import { useMemo, useEffect, useReducer, createContext, ReactElement } from "react"
import moment from 'moment-timezone'

export type TransactionItemType = {
    id: number,
    amount: number,
    beneficiary: string,
    account: string,
    address: string,
    date: string,
    description: string,
}

type TransactionStateType = { 
	search: string,
	pagination: number,
	transactions: TransactionItemType[] 
}

const initTransactionState: TransactionStateType = { 
	search:'', 
	pagination: 1,
	transactions: []
}

const REDUCER_ACTION_TYPE = {
    ADD: "ADD",
    REMOVE: "REMOVE",
	FILTER: "FILTER",
	CHANGE_PAGINATION: "CHANGE_PAGINATION",
	SET_DATA: "SET_DATA",
}

type payloadTransactionType = {
	search?: string,
	pagination?: number,
	transaction?: TransactionItemType,
	transactionId?: number,
	transactionsList?: TransactionItemType[]
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
    type: string,
    payload?: payloadTransactionType,
}

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
        default:
            throw new Error('Unidentified reducer action type')
    }
}

const useTransactionContext = () => {

	const [state, dispatch] = useReducer(reducer, initTransactionState)

	useEffect(() => {

		const fetchTransactions = async(): Promise<TransactionItemType[]> => {
			try {
				const response = await fetch(process.env.REACT_APP_GET_TRANSACTION_API || "")
                
				if (!response.ok) {
					throw new Error(`HTTP error: ${response.status}`);
				}
	
				const data = await response.json()
				return data
			}
			catch (error) {
				console.error(`Fetch transactions problem: ${error}`)
				return []
			}
		}
		const promise = fetchTransactions();
		
		promise.then(transactionsData => {
			dispatch({
				type: REDUCER_ACTION_TYPE.SET_DATA,
				payload: { transactionsList: transactionsData }
			})
		})
		
    }, [])

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
		transactionsQty: transactionQty 
	}
}

export type UseTransactionContextType = ReturnType<typeof useTransactionContext>

const initTransactionContextState: UseTransactionContextType = {
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    balance: '',
    transactions: [],
	pagination: 1,
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