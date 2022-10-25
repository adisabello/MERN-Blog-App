import { LoginContext } from "../Contexts/LoginContext";
import {useContext} from 'react'
import {Link} from 'react-router-dom'

const Header = function (){

    let {loggedIn} = useContext(LoginContext)

    return (
        <div className='header'>
            <header>
                <h1>Code_Blog</h1>
            </header>
            <ul>
                <li><Link to='./'>Home</Link></li>
                { loggedIn ? "" : <li><Link to='./login'>Log In</Link></li>}
                { loggedIn ? "" : <li><Link to='./register'>Register</Link></li>}
                { loggedIn ? <li><Link to='./myposts'>My Posts</Link></li>: ""}
                { loggedIn ? <li><Link to='./logout'>Log Out</Link></li>: ""}
            </ul>
        </div>
    )

}

export default Header;