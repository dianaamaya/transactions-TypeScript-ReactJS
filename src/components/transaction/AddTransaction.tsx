import { useState, FormEvent, ChangeEvent, useCallback } from "react"
import { FaPlus } from "react-icons/fa"
import moment from 'moment-timezone'
import useTransactions from "../../hooks/useTransactions"
import Alert from "../Alert"
import addTransactionStyle from "../../styles/addTransaction.module.css"


type PropsType = {}

type formType = {
    amount: string,
    beneficiary: string,
    account: string,
    address: string,
    description: string,
}

const initFormState: formType = {
    amount: "",
    beneficiary: "",
    account: "",
    address: "",
    description: "",
}

type validateFormType = {
    amount: string,
    beneficiary: string,
    account: string,
    address: string,
    description: string,
}

const initValidateFormState = {
    amount: "",
    beneficiary: "",
    account: "",
    address: "",
    description: "",
}

const AddTransaction = (props: PropsType) => {
    
    const { dispatch, REDUCER_ACTIONS, transactions } = useTransactions()
    const [newTransaction, setNewTransaction] = useState<formType>(initFormState)
    const [validations, setValidations] = useState<validateFormType>(initValidateFormState)
    const [validated, setValidated] = useState<boolean>(false)
    const [alert, setAlert] = useState<string>("")

    const validateForm = useCallback(( currentTransaction: formType):validateFormType =>  {

        const numberFormat= "^[0-9]+$"
        const decimalFormat = "^[0-9]+([.,][0-9]+)?$"
        const amountValue = parseFloat(currentTransaction.amount.replace(",", "."))
        const amountValidation = currentTransaction.amount.match(decimalFormat) && amountValue > 0
            ? "" 
            : "Amount quantity must be a number > 0, ex: 1200,50 or 1200.50"
        const beneficiaryValidation = currentTransaction.beneficiary.length ? "" : "Beneficiary field must not be empty"
        const accountValidation = currentTransaction.account.match(numberFormat) ? "" : "Account field must be only numbers"
        const addressValidation = currentTransaction.address.length ? "" : "Address field must not be empty"
        const descriptionValidation = currentTransaction.description.length ? "" : "Description field must not be empty"
       
        const validation = {
            amount: amountValidation,
            beneficiary: beneficiaryValidation,
            account: accountValidation,
            address: addressValidation,
            description: descriptionValidation,
        }

        setValidations({ ...validation })

        return validation
    }, [])

    const handleTransaction = () => {
        
        setValidated(true)

        const formFalidations = validateForm(newTransaction)

        if (Object.values(formFalidations).some((item) => typeof item === "string" && item.length)) {
            return
        }

        const currentTransactions = transactions.length ? transactions.slice().sort((a, b) => a.id - b.id) : []
        const id = currentTransactions.length ? currentTransactions[currentTransactions.length - 1].id + 1 : 1
        const date = moment().format("YYYY-MM-DDTHH:mm:ss")
        const { amount, beneficiary, account, address, description } = newTransaction

        const myNewTransaction = {
            id,
            amount: parseFloat(amount.replace(",",".")),
            beneficiary,
            account: `PL${account}`,
            address,
            date,
            description,
        }
        
        try {
            dispatch({ 
                type: REDUCER_ACTIONS.ADD, 
                payload: { transaction: myNewTransaction }
            })

            setAlert("success")
            setTimeout(() => {setAlert("")}, 2000)
            setNewTransaction(initFormState)
            setValidations(initValidateFormState)
            setValidated(false)
        } catch (error) {
            console.error(error);
            setAlert("danger")
            setTimeout(() => {setAlert("")}, 2000)
        }

    }

    const updateTransactionState = useCallback((key:string) =>(e:ChangeEvent<HTMLInputElement>): void => {

        setNewTransaction({ ...newTransaction, [key]: e.target.value })
        setValidations({ ...validateForm({ ...newTransaction, [key]: e.target.value }) })

    }, [newTransaction, validateForm])

    const handleSubmit = ( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault()
        handleTransaction()
    }

    const content = (
        <form className={addTransactionStyle.addForm} onSubmit={handleSubmit}>
            
            <label htmlFor="addAmount">Amount</label>
            <input 
                    id="addAmount" 
                    value={newTransaction.amount}
                    onChange={updateTransactionState("amount")} />
            {
                validated && 
                <div className={addTransactionStyle.addForm__error}>
                    { validations.amount }
                </div> 
            }
                   
            <label htmlFor="addBeneficiary">Beneficiary</label>
            <input 
                    id="addBeneficiary" 
                    value={newTransaction.beneficiary} 
                    onChange={updateTransactionState("beneficiary")} />
            {
                validated && 
                <div className={addTransactionStyle.addForm__error}>
                    { validations.beneficiary }
                </div> 
            }

            <label htmlFor="addAccount">Account</label>
            <input 
                id="addAccount" 
                value={newTransaction.account}
                onChange={updateTransactionState("account")} />

            {
                validated && 
                <div className={addTransactionStyle.addForm__error}>
                    { validations.account }
                </div> 
            }    

            <label htmlFor="addAddress">Address</label>
            <input 
                id="addAddress" 
                value={newTransaction.address}
                onChange={updateTransactionState("address")} />

            {
                validated && 
                <div className={addTransactionStyle.addForm__error}>
                    { validations.address }
                </div> 
            }

            <label htmlFor="addDescription">Description</label>
            <input 
                id="addDescription" 
                value={newTransaction.description}
                onChange={updateTransactionState("description")} />
            {
                validated && 
                <div className={addTransactionStyle.addForm__error}>
                    { validations.description }
                </div> 
            }

            {
                alert === "success" || alert === "danger"
                    ? <Alert 
                        message={alert === "danger" ? "Something was wrong..." : "Transaction was added successfully!"} 
                        type={alert} />
                    : null
            }
            
            <button type="submit">
                <FaPlus />  Add Transaction
            </button>
        </form>
    )

    return content
}
export default AddTransaction