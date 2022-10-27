import {useContext, useState} from 'react';
import { LoginContext } from '../Contexts/LoginContext';
import {useMutation} from '@apollo/client'
import {LOGIN} from '../GraphQL/Mutations'
import {useNavigation} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Login = function(){
    let nav = useNavigate();
    let {setUserId, setLoggedIn} = useContext(LoginContext)
    const [err, setError] = useState("")
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [login, {error, data, loading}] = useMutation(LOGIN, {
        onCompleted: (data)=>{
            let id = data.login;
            console.log("complete", data.login);
            if(id.includes("Error")){
                setError(id);
            }else{
                setLoggedIn(true)
                setUserId(id)
                localStorage.setItem("uid", id);
                nav('../')
            }
        }
    });

    let loginFunc = ()=>{
        login({
            variables: {
                "email": email,
                "password": password
            }
        });

        if(error){
            console.log(error);
        }
    }

    return (
        <div>
            <div className="form">
                <p>Email</p>
                <input type="email" placeholder="email" onChange={(e)=>{
                    setEmail(e.target.value)
                }}/>
                <p>Password</p>
                <input type="password" onChange={(e)=>{
                    setPassword(e.target.value)
                }}/>
                <br/><br/>
                <button onClick={()=> loginFunc()}>Log In</button>
                <p className='error'>{err}</p>
            </div>
        </div>
    )
}

export default Login;