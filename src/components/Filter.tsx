import { useState, ChangeEvent, useCallback } from "react"
import useTransactions from "../hooks/useTransactions"
import filterStyle from "../styles/filter.module.css"


type PropsType = {}

const Filter = (props: PropsType) => {

    const { dispatch, REDUCER_ACTIONS } = useTransactions()

    const [search, setSearch] = useState<string>("")

    const handleFilter = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const searchText = e.target.value

      dispatch({ 
        type: REDUCER_ACTIONS.FILTER, 
        payload: { search: searchText }
      })
      setSearch(e.target.value)
    }, [REDUCER_ACTIONS.FILTER, dispatch])

    const content = (
        <form
          className={filterStyle.searchForm} 
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
          <input 
            data-testid="search"
            id="search"
            type="text" 
            role="searchbox"
            placeholder="Search beneficiary..."
            value={search}
            onChange={handleFilter}
          />
        </form>
    )

    return content
}
export default Filter