import { ReducerAction, TransactionItemType } from "./types"
import { ADD, REMOVE, SET_DATA, SET_MESSAGE } from "./reducerTypes"

 const getTransactions = async (dispatch: React.Dispatch<ReducerAction>) => {

    try {
        const response = await fetch(process.env.REACT_APP_GET_TRANSACTION_API || "")
        const data = await response.json()
        dispatch({ 
            type: SET_DATA, 
            payload: { transactionsList: data }
        })
    }
    catch (error) {
        dispatch({ 
            type: SET_MESSAGE, 
            payload: { message: { 
                msg: `Problem getting transactions: ${error}`, 
                type: "danger"
            }}
        })
    }
}

const addSingleTransaction = (dispatch: React.Dispatch<ReducerAction>, newTransaction: TransactionItemType ) => {

    try {
        // add transaction - server request
        dispatch({ 
            type: ADD, 
            payload: { transaction: newTransaction }
        })
        dispatch({ 
            type: SET_MESSAGE, 
            payload: { message: { 
                msg: "Transaction was added successfully!", 
                type: "success"
            }}
        })
    } catch (error) {
        dispatch({ 
            type: SET_MESSAGE, 
            payload: { message: { 
                msg: `Problem adding the transaction: ${error}`, 
                type: "danger"
            }}
        })
    }
}


const deleteTransaction = (dispatch: React.Dispatch<ReducerAction>, transactionId: number) => {

    try {
        // delete transaction - server request
        dispatch({ 
          type: REMOVE, 
          payload: { transactionId: transactionId }
        })
        dispatch({ 
            type: SET_MESSAGE, 
            payload: { message: { 
                msg: "transaction was deleted successfully!", 
                type: "success"
            }}
        })
      } catch (error) {
        dispatch({ 
            type: SET_MESSAGE, 
            payload: { message: { 
                msg: `Problem deleting the transaction: ${error}`, 
                type: "danger"
            }}
        })
      }
}

export { getTransactions, addSingleTransaction, deleteTransaction }