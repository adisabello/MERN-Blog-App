import {useContext, useState} from 'react';
import { LoginContext } from '../Contexts/LoginContext';
import {CREATE_USER} from '../GraphQL/Mutations';
import {useMutation} from '@apollo/client';
import {useNavigate} from 'react-router-dom'

const Register = function(){

    let {setUserId, setLoggedIn} = useContext(LoginContext)
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [addUser, {error}] = useMutation(CREATE_USER);
    let history = useNavigate();
    let register = ()=>{
        addUser({
            variables: {
                "email": email,
                "username": username,
                "password": password
            }
        });

        if(error){
            console.log(error);
        }else{
            history("../login")
        }
    }

    return (
        <div className='form'>
            <form action='#'>
                <p>Username</p>
                <input type="text" placeholder="Username" onChange={(e)=>{
                    setUsername(e.target.value)
                }}/>
                <p>email</p>
                <input type="text" placeholder="Email" onChange={(e)=>{
                    setEmail(e.target.value)
                }}/>
                <p>Password</p>
                <input type="password" onChange={(e)=>{
                    setPassword(e.target.value)
                }}/>
                <br/><br/>
                <button onClick={()=>register()}>Register</button>
                <p></p>
            </form>
        </div>
    )
}

export default Register;