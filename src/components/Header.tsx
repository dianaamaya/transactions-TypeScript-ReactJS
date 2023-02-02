import Nav from "./Nav"
import headerStyles from "../styles/header.module.css"

type PropsType = {}

const Header = (props: PropsType) => {

    const content = (
        <header className={headerStyles.header}>
            <div className={headerStyles.header__title}>
                <h1>Millennium</h1>
                <Nav />
            </div>
            
        </header>
    )

    return content
}
export default Header