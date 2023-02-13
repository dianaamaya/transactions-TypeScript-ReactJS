import { ReducerAction, TransactionType } from "./contextTypes"
import { REDUCER_ACTION_TYPE } from "./contextTypes"

 const getTransactions = async (dispatch: React.Dispatch<ReducerAction>) => {

    try {
        const response = await fetch(process.env.REACT_APP_GET_TRANSACTION_API || "")
        const data = await response.json()
        dispatch({ 
            type: REDUCER_ACTION_TYPE.SET_DATA, 
            payload: data
        })
    }
    catch (error) {
        dispatch({ 
            type: REDUCER_ACTION_TYPE.SET_MESSAGE, 
            payload: {
                msg: `Problem getting transactions: ${error}`, 
                type: "danger"
            }
        })
    }
}

const addSingleTransaction = (dispatch: React.Dispatch<ReducerAction>, newTransaction: TransactionType ) => {

    try {
        // add transaction - server request
        dispatch({ 
            type: REDUCER_ACTION_TYPE.ADD, 
            payload: newTransaction
        })
        dispatch({ 
            type: REDUCER_ACTION_TYPE.SET_MESSAGE, 
            payload: {
                msg: "Transaction was added successfully!", 
                type: "success"
            }
        })
    } catch (error) {
        dispatch({ 
            type: REDUCER_ACTION_TYPE.SET_MESSAGE, 
            payload: {
                msg: `Problem adding the transaction: ${error}`, 
                type: "danger"
            }
        })
    }
}


const deleteTransaction = (dispatch: React.Dispatch<ReducerAction>, transactionId: number) => {

    try {
        // delete transaction - server request
        dispatch({ 
          type: REDUCER_ACTION_TYPE.REMOVE, 
          payload: transactionId
        })
        dispatch({ 
            type: REDUCER_ACTION_TYPE.SET_MESSAGE, 
            payload: {
                msg: "transaction was deleted successfully!", 
                type: "success"
            }
        })
      } catch (error) {
        dispatch({ 
            type: REDUCER_ACTION_TYPE.SET_MESSAGE, 
            payload: {
                msg: `Problem deleting the transaction: ${error}`, 
                type: "danger"
            }
        })
      }
}

export { getTransactions, addSingleTransaction, deleteTransaction }