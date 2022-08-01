import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './login.css';
const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    })

    const navigate = useNavigate();
    const { loading, error, dispatch } = useContext(AuthContext);
    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleLogin =async (e)=>{
        e.preventDefault();
        dispatch({type:"LOGIN_START"})
        try {
            const response = await axios.post("/auth/login",credentials);
            dispatch({type:"LOGIN_SUCCESS",payload:response.data})
            navigate("/");
        } catch (err) {
            
        dispatch({type:"LOGIN_FAILURE",payload:err.response.data})
    }
    }
    return (
        <div className='login'>
            <div className="lContainer">
                <input type="text" className='lInput' placeholder='username' name="" id="username" onChange={handleChange} />
                <input type="password" className='lInput' placeholder='password' name="" id="password" onChange={handleChange} />
                <button disabled={loading} onClick={handleLogin} className='lButton'>Login</button>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    );
}

export default Login;
