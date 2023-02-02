import modalStyle from "../styles/modal.module.css"

type PropsType = {
    okFunction: () => void,
    cancelFunction: () => void,
    title: string,
}

const Modal = ({ okFunction, cancelFunction, title }: PropsType) => {

    const content = (
      <div className={modalStyle.modal}>
        <div 
          className={modalStyle.modal__blur} 
          onClick={cancelFunction}
        />
        <div className={modalStyle.modal__content}>
          <div className={modalStyle.modal__title}>
           {title}
          </div>

          <div className={modalStyle.modal__buttons}>
            <button 
              className={modalStyle.modal__buttons__secondary} 
              onClick={okFunction}
            >
                Yes
            </button>
            <button 
              className={modalStyle.modal__buttons__primary} 
              onClick={cancelFunction}
            >
                No
            </button>
          </div>
        </div>
      </div>
    )

    return content
}
export default Modal