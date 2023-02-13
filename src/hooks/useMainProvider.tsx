import { useContext } from "react"
import MainProvider from "../context/MainProvider"
import { ContextType } from "../context/MainProvider"

const useMainProvider = (): ContextType => {
    return useContext(MainProvider)
}

export default useMainProvider