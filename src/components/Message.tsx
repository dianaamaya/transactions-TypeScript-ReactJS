import { useEffect } from "react"
import messageStyle from "../styles/message.module.css"
import useMainProvider from "../hooks/useMainProvider"

type PropsType = {}

const Message = (props: PropsType) => {

    const { message, setMessage } = useMainProvider()

    useEffect(() => {
        if (message.msg) {
            setTimeout(() => setMessage({ type: "success", msg: "" }), 3000)
        }
    }, [message.msg, setMessage])

    const content = message.msg ? (
        <div data-testid='alert' role="alert" className={`${messageStyle.alert__content} ${messageStyle[message.type]}`}>
            { message.msg }
        </div>
    ) : null

    return content
}
export default Message