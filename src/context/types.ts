export type TransactionItemType = {
    id: number,
    amount: number,
    beneficiary: string,
    account: string,
    address: string,
    date: string,
    description: string,
}

export type message = {
    msg: string
    type: "success" | "danger"
}

export type TransactionStateType = { 
	search: string,
	pagination: number,
	transactions: TransactionItemType[] ,
    message: message,
}

export type payloadTransactionType = {
	search?: string,
	pagination?: number,
	transaction?: TransactionItemType,
	transactionId?: number,
	transactionsList?: TransactionItemType[],
    message?: message,
}

export type ReducerAction = {
    type: string,
    payload?: payloadTransactionType,
}