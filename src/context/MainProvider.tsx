import { useState, createContext, ReactElement } from "react"
import { message } from "./contextTypes"

export type ContextType = {
    loaded: boolean,
    setLoaded: React.Dispatch<React.SetStateAction<boolean>>,
    message: message,
    setMessage: React.Dispatch<React.SetStateAction<message>>,
}

const initState: ContextType = { 
	loaded: false,
    setLoaded: () => {},
    message: { type:"success", msg: ""},
    setMessage: () => {}
}

const MainContext = createContext<ContextType>(initState)

type ChildrenType = { children?: ReactElement | ReactElement[] }

const MainProvider = ({ children }: ChildrenType): ReactElement => {

    const [loaded, setLoaded] = useState<boolean>(initState.loaded)
    const [message, setMessage] = useState<message>(initState.message)

    const values = { 
        loaded,
        setLoaded,
        message,
        setMessage
	}
	
    return (<MainContext.Provider value={values}>
            {children}
        </MainContext.Provider>
    ) 
}

export { MainContext, MainProvider } 