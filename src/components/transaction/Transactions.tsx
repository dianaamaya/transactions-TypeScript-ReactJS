import { ReactElement, useState, useEffect } from "react"
import { getTransactions, deleteTransaction } from "../../context/apiRequest"
import useTransactions from "../../hooks/useTransactions"
import SingleTransaction from "./SingleTransaction"
import Pagination from "../Pagination"
import Modal from "../Modal"
import transactionsStyle from "../../styles/transactions.module.css"

type PropsType = {}

const Transactions = (props: PropsType) => {

  const { dispatch, transactions } = useTransactions()
  const [modal, setModal] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [selectedTransaction, setSelectedTransaction] = useState<number | null>(null)

  useEffect(() => {
		getTransactions(dispatch).then(() => setLoaded(true))
  }, [dispatch])

  const cancelRemoveTransaction = () => {
    setModal(false) 
    setSelectedTransaction(null)
  }

  const removeTransaction = () => {

    if (selectedTransaction !== null) {
      deleteTransaction(dispatch, selectedTransaction)
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      })
      setModal(false)
      setSelectedTransaction(null)
    }
    
  }

  let content: ReactElement | ReactElement[] = <p>{ loaded ? "No Data Found" : "Loading..."}</p>

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
      
        <table 
          data-testid='transactionsTable'
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