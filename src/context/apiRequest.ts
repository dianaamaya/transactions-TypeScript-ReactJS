import { ReducerAction, TransactionType } from "./contextTypes"
import { REDUCER_ACTION_TYPE, message } from "./contextTypes"

 const getTransactions = async (dispatch: React.Dispatch<ReducerAction>, 
    setMessage: React.Dispatch<React.SetStateAction<message>>) => {

    try {
        const response = await fetch(process.env.REACT_APP_GET_TRANSACTION_API || "")
        const data = await response.json()
        dispatch({ 
            type: REDUCER_ACTION_TYPE.SET_DATA, 
            payload: data
        })
    }
    catch (error) {
        setMessage({
            msg: `Problem getting transactions: ${error}`, 
            type: "danger"
        })
    }
}

const addSingleTransaction = (dispatch: React.Dispatch<ReducerAction>, 
    setMessage: React.Dispatch<React.SetStateAction<message>>,
    newTransaction: TransactionType ) => {

    try {
        // add transaction - server request
        dispatch({ 
            type: REDUCER_ACTION_TYPE.ADD, 
            payload: newTransaction
        })
        setMessage({
            msg: "Transaction was added successfully!", 
            type: "success"
        })
    } catch (error) {
        setMessage({
            msg: `Problem adding the transaction: ${error}`, 
            type: "danger"
        })
    }
}


const deleteTransaction = (dispatch: React.Dispatch<ReducerAction>, 
    setMessage: React.Dispatch<React.SetStateAction<message>>,
    transactionId: number) => {

    try {
        // delete transaction - server request
        dispatch({ 
          type: REDUCER_ACTION_TYPE.REMOVE, 
          payload: transactionId
        })
        setMessage({
            msg: "transaction was deleted successfully!", 
            type: "success"
        })
      } catch (error) {
        setMessage({
            msg: `Problem deleting the transaction: ${error}`, 
            type: "danger"
        })
      }
}

export { getTransactions, addSingleTransaction, deleteTransaction }