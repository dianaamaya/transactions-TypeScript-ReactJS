import { useReducer, createContext, ReactElement } from "react"
import { transactionReducer } from "./transactionReducer"
import { TransactionType, StateType, ReducerAction } from "./contextTypes"

type UseTransactionContextType = {
	search: string;
    pagination: number;
    transactions: TransactionType[];
	dispatch: React.Dispatch<ReducerAction>
}

const initState: StateType = { 
	search: "", 
	pagination: 1,
	transactions: [],
}

const initTransactionContextState = {
	...initState,
	dispatch: () => {}
}

const TransactionContext = createContext<UseTransactionContextType>(initTransactionContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] }

const TransactionsProvider = ({ children }: ChildrenType): ReactElement => {

	const [state, dispatch] = useReducer(transactionReducer, initState)
	
    return (<TransactionContext.Provider value={{...state, dispatch}}>
            {children}
        </TransactionContext.Provider>
    ) 
}

export { TransactionContext, TransactionsProvider } 