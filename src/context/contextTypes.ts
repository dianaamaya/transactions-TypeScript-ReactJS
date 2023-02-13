export type TransactionType = {
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

export type StateType = { 
	search: string,
	pagination: number,
	transactions: TransactionType[],
}

export enum REDUCER_ACTION_TYPE { 
    ADD = "ADD", 
    REMOVE = "REMOVE", 
    FILTER = "FILTER", 
    CHANGE_PAGINATION = "CHANGE_PAGINATION", 
    SET_DATA = "SET_DATA"
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

type add = {
    type: REDUCER_ACTION_TYPE.ADD,
    payload: TransactionType
}

type remove = {
    type: REDUCER_ACTION_TYPE.REMOVE,
    payload: number
}

type filter = {
    type: REDUCER_ACTION_TYPE.FILTER,
    payload: string
}

type changePagination = {
    type: REDUCER_ACTION_TYPE.CHANGE_PAGINATION,
    payload: number
}

type setData = {
    type: REDUCER_ACTION_TYPE.SET_DATA,
    payload: TransactionType[]
}

export type ReducerAction = add | remove | filter | changePagination | setData