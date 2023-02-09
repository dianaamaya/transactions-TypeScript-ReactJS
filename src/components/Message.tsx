import { useEffect } from "react"
import messageStyle from "../styles/message.module.css"
import useTransactions from "../hooks/useTransactions"
import { SET_MESSAGE } from "../context/reducerTypes"

type PropsType = {}

const Message = (props: PropsType) => {

    const { message, dispatch } = useTransactions()

    useEffect(() => {
        if (message.msg) {
            setTimeout(() => dispatch({
                type: SET_MESSAGE,
                payload: { message: { type: "success", msg: "" }}
            }), 3000)
        }
    }, [message.msg, dispatch])

    const content = message.msg ? (
        <div data-testid='alert' role="alert" className={`${messageStyle.alert__content} ${messageStyle[message.type]}`}>
            {message.msg}
        </div>
    ) : null

    return content
}
export default Message