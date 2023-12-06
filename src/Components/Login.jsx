import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const [warning, setWarning] = useState(null);

    const navigate = useNavigate();

    const loginHandler = (e)=>{
        e.preventDefault();

        const userDetail = {
            username,
            password
        }

        setWarning('')

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/user-login`, userDetail)
        .then((res)=>{
            console.log(res.data.data.token);
            setWarning(res.data.message);
            localStorage.setItem('token',res.data.data.token)
            setTimeout(() => {

                navigate('/user-details');

                setUsername(null);
                setPassword(null);
            }, 1500);
        }).catch((err)=>{
            console.log(err);
            setWarning(err.response.data.message);
        })
    }

    return (
        <div className="container">
        <div className="login-page" id="signup-form">
            <form id="signup" onSubmit={loginHandler}>
                    <p className="welcome-wish margin">Welcome To Login Page! 👋</p>
                    <h1 className="heading margin">Login to your account</h1>
                    
                    <div className="label">
                        <label>Username</label>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} id="username" />
                    </div>
                    
                    <div className="label">
                        <label>Password</label>
                    </div>
                    <div className="input">
                        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} id="password" />
                    </div>

                    <button type="submit" id="submit-button">Login</button>

                    {
                        warning ? <p className="warning-message">{warning}</p> : ''
                    }
                </form>
        </div>
        <h5 className="already-account">Don't have an account? <span onClick={()=>navigate('/')}>Sign up</span></h5>
        </div>
    )
}

export default Login
