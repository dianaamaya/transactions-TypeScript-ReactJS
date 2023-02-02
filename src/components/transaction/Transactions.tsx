import { ReactElement, useState } from "react"
import useTransactions from "../../hooks/useTransactions"
import SingleTransaction from "./SingleTransaction"
import Pagination from "../Pagination"
import Modal from "../Modal"
import Alert from "../Alert"
import transactionsStyle from "../../styles/transactions.module.css"

type PropsType = {}

const Transactions = (props: PropsType) => {

  const { dispatch, REDUCER_ACTIONS, transactions } = useTransactions()
  const [modal, setModal] = useState<boolean>(false)
  const [alert, setAlert] = useState<string>("")
  const [selectedTransaction, setSelectedTransaction] = useState<number | null>(null)

  const cancelRemoveTransaction = () => {
    setModal(false) 
    setSelectedTransaction(null)
  }

  const removeTransaction = () => {

    if (selectedTransaction !== null) {
      try {
        dispatch({ 
          type: REDUCER_ACTIONS.REMOVE, 
          payload: { transactionId: selectedTransaction }
        })

        window.scrollTo({
          behavior: 'smooth',
          top: 0,
        })

        setModal(false)
        setSelectedTransaction(null)
        setAlert("success")
        setTimeout(() => setAlert(""), 2000)
      } catch (error) {
        console.error(error);
        setModal(false)
        setAlert("danger")
        setTimeout(() => setAlert(""), 2000)
      }
    }
    
  }

  let content: ReactElement | ReactElement[] = <p>No Data Found</p>

  if (transactions?.length) {

    const transactionTableBody = ( transactions.map(transaction => {
      return (<SingleTransaction 
                  key={transaction.id} 
                  transaction={transaction} 
                  setModal={setModal} 
                  setSelectedTransaction={setSelectedTransaction}
              />)
    }))

    content = <>
      <div className={transactionsStyle.transaction__table__container}>
        {
          alert === "success" || alert === "danger"
          ? <>
              <Alert 
                message={alert === "danger" ? "Something was wrong..." : "Transaction was deleted successfully!"} 
                type={alert} /> 
              <br/>
            </>
          : null
        }
        <table 
          className={transactionsStyle.transaction__table}>
          <thead>
            <tr>
              <th>Id</th> 
              <th>Amount</th> 
              <th>Beneficiary</th> 
              <th>Account</th> 
              <th>Address</th> 
              <th>Date</th> 
              <th>Description</th> 
              <th></th> 
            </tr>
          </thead> 
          <tbody>  
            {transactionTableBody}      
          </tbody>
        </table>
        <Pagination />
      </div> 
      {
        modal && 
        <Modal 
          title={`The transaction with identificator ${selectedTransaction} will be removed, are you sure?`}
          okFunction={removeTransaction} 
          cancelFunction={cancelRemoveTransaction}
        />
      }
    </>
  }

  return content
}
export default Transactions