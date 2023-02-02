import footerStyles from "../styles/footer.module.css"

type PropsType = {}

const Footer = (props: PropsType) => {

    const year: number = new Date().getFullYear()

    const content = (
        <footer className={footerStyles.footer}>
            <p>Millennium &copy; {year}</p>
        </footer>
    )

    return content
}
export default Footer