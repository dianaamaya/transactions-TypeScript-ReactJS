import React, { ReactElement, memo } from "react"
import { TransactionType } from "../../context/contextTypes"
import { FaRegTrashAlt } from "react-icons/fa"
import moment from 'moment-timezone'

type PropsType = {
    transaction: TransactionType,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedTransaction: React.Dispatch<React.SetStateAction<number | null>>,
}

const SingleTransaction = ({ transaction, setModal, setSelectedTransaction }: PropsType): ReactElement => {

    const content =
      <tr key={transaction.id}>
        <td>{transaction.id}</td>
        <td>{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(transaction.amount)}</td>
        <td>{transaction.beneficiary}</td>
        <td>{transaction.account} </td>
        <td>{transaction.address} </td>
        <td>{moment(transaction.date).format("YYYY-MM-DD H:mm")} </td>
        <td>{transaction.description} </td>
        <td>
            <button 
                onClick={() => {
                    setModal(true)
                    setSelectedTransaction(transaction.id)
                }}
            >
                <FaRegTrashAlt />
            </button>
        </td>
      </tr>

    return content
}

function areTransactionsEqual({ transaction: prevTransaction }: PropsType, { transaction: nextTransaction }: PropsType) {
    return (
        Object.keys(prevTransaction).every(key => {
            return prevTransaction[key as keyof TransactionType] ===
            nextTransaction[key as keyof TransactionType]
        }) 
    )
}
const MemoizedTransaction = memo<typeof SingleTransaction>(SingleTransaction, areTransactionsEqual)

export default MemoizedTransaction