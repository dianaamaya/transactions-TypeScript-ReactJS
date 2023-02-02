import alertStyle from "../styles/alert.module.css"

type messageType = "success" | "danger"

type PropsType = {
    message: string,
    type: messageType
}

const Alert = ({ message, type }: PropsType) => {

    const content = (
        <div id="alert" className={`${alertStyle.alert__content} ${alertStyle[type]}`}>
            {message}
        </div>
    )

    return content
}
export default Alert