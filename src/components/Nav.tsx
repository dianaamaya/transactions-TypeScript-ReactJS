import { useState } from "react";
import { NavLink  } from "react-router-dom";
import navStyles from "../styles/nav.module.css"
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx"
type PropsType = {}


const Nav = (props: PropsType) => {

    const [navActive, setNavActive] = useState(false)

    const menu = (
        <ul className={ navActive ? navStyles.nav__in : "" }>
            <li>
                <NavLink  
                    to='/'
                    onClick={() => setNavActive(false)}>
                    Transactions
                </NavLink>
            </li>
            <li>
            <NavLink  
                to='/description' 
                onClick={() => setNavActive(false)}>
                Description
            </NavLink>
            </li>
        </ul>
    )

    const content = (<>
        { 
            navActive 
            ? <div className={navStyles.nav__blur} onClick={() => setNavActive(false) } /> 
            : null 
        }
        <nav className={navStyles.nav}>
            
            <button 
                className={navStyles.nav__mobile}
                onClick={() => setNavActive(!navActive)}>
                { navActive ?  <RxCross1 /> : <RxHamburgerMenu /> }
            </button>
            {menu}
        </nav>
    </>)

    return content
}
export default Nav