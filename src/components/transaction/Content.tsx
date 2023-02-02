import useTransactions from "../../hooks/useTransactions"
import Transactions from "./Transactions"
import AddTransaction from "./AddTransaction"
import Filter from "../Filter"
import contentStyle from "../../styles/content.module.css"

const Content = () => {
    const { balance } = useTransactions()

    const mainContent = (
        <main className={contentStyle.main__transaction}>
            <div className={contentStyle.transaction__header}>
                <div className={contentStyle.transaction__resume}>
                    <p className={contentStyle.transaction__balance}>
                        <b>Balance:</b> {balance}
                    </p>
                    <Filter />
                </div>
                <AddTransaction />
            </div>
            <Transactions />
        </main>
    )

    return mainContent
}
export default Content