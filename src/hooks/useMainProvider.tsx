import { useContext } from "react"
import { MainContext } from "../context/MainProvider"
import { ContextType } from "../context/MainProvider"

const useMainProvider = (): ContextType => {
    return useContext(MainContext)
}

export default useMainProvider