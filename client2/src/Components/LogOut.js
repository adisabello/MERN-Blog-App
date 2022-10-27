import {useNavigate, Link} from 'react-router-dom'
import {useContext} from 'react'
import { LoginContext } from '../Contexts/LoginContext';

const LogOut = function(){
    let {setLoggedIn, setUserId} = useContext(LoginContext);
    setLoggedIn(false);
    setUserId("");
    let nav = useNavigate();        
    nav('../')
    return (
        <div>
            <Link to='../'>Back to home page</Link>
        </div>
    )
}

export default LogOut;
