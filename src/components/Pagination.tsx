import { useMemo, ReactElement, useCallback } from "react"
import useTransactions from "../hooks/useTransactions"
import paginationStyle from "../styles/pagination.module.css"

type PropsType = {
    pageSize?: number,
}

const Pagination = ({ pageSize = 20, }: PropsType) => {

    const { dispatch, REDUCER_ACTIONS, transactionsQty, pagination } = useTransactions()

    const totalPages = Math.ceil(transactionsQty / pageSize);

    const handlePagination = useCallback((newPagination:number) => {
        
        let currentPagination = newPagination < 1 ? 1 : newPagination
        currentPagination = currentPagination > totalPages ? totalPages : currentPagination
        
        dispatch({ 
            type: REDUCER_ACTIONS.CHANGE_PAGINATION, 
            payload: { pagination: currentPagination }
        })
    }, [REDUCER_ACTIONS.CHANGE_PAGINATION, dispatch, totalPages])
    
    const paginationRange = useMemo(() => {
        const paginationValues: number[] = Array.from({length: totalPages}, (v, i) => i + 1)
        const paginationElements: ReactElement[] = paginationValues.map((val, idx) => {
            return <button 
                        className={pagination === val ? paginationStyle.active :  ""}
                        key={idx} 
                        value={val} 
                        onClick={() => handlePagination(val)}>
                            {val}
                    </button>
        })
        return paginationElements
    }, [pagination, totalPages, handlePagination]);

    const content = (
        <div className={paginationStyle.paginationBar}>
            <button 
                className={pagination === 1 ? paginationStyle.previous__disable : paginationStyle.Previous } 
                onClick={() => handlePagination(pagination - 1)}>
                Previous
            </button>
            {paginationRange}
            <button 
                className={pagination === totalPages ? paginationStyle.next__disable : paginationStyle.next } 
                onClick={() => handlePagination(pagination + 1)}>
                Next
            </button>
        </div>
    )

    return content
}
export default Pagination