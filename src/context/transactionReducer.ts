import { TransactionType, StateType, ReducerAction, REDUCER_ACTION_TYPE } from "./contextTypes"

const transactionReducer = (state: StateType, action: ReducerAction): StateType => {
    switch (action.type) {

        case REDUCER_ACTION_TYPE.ADD: {
            return { 
                ...state,  
                transactions: [ ...state.transactions, action.payload],
                pagination: 1,
            }
        }

        case REDUCER_ACTION_TYPE.REMOVE: {
            const filteredTransaction: TransactionType[] = state.transactions.filter(item => 
                item.id !== action.payload)

            return { 
                ...state, 
                transactions: [...filteredTransaction], 
                pagination: 1,
            }
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

        default: 
            throw new Error('Unidentified reducer action type')
            
    }
}

export { transactionReducer }