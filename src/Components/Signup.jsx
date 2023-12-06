import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [gender, setGender] = useState(null);
    const [address, setAddress] = useState(null);
    const [password, setPassword] = useState(null);

    const [warning, setWarning] = useState(null);

    const navigate = useNavigate();

    const userData = {
        name,
        username,
        email,
        gender,
        address,
        password
    }

    const signupHandler = (e)=>{
        e.preventDefault();
        setWarning('')
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/user-signup`, userData)
        .then((res)=>{
            console.log(res.data.message);
            setWarning(res.data.message);
            setTimeout(()=>{

                navigate('/login');

                setName(null);
                setUsername(null);
                setEmail(null);
                setPassword(null);
                setGender(null);
                setAddress(null);
                setWarning(null);
            },2000)
        })
        .catch((err)=>{
            console.log(err.response.data.data.details[0].message);
            setWarning(err.response.data.data.details[0].message);
        })
    }

    return (
        <div className="container">
            <div id="signup-form">
                <form id="signup" onSubmit={signupHandler}>
                    <p className="welcome-wish margin">Welcome Skygoal! 👋</p>
                    <h1 className="heading margin">Sign up to your account</h1>
                    <div className="label">
                        <label>Full Name</label>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)} id="name" />
                    </div>
                    <div className="label">
                        <label>Username</label>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} id="username" />
                    </div>
                    <div className="label">
                        <label>Email</label>
                    </div>
                    <div className="input">
                        <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} id="email" />
                    </div>
                    <div className="label">
                        <label>Gender</label>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Gender" onChange={(e)=>setGender(e.target.value)} id="gender" />
                    </div>
                    <div className="label">
                        <label>Address</label>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Address" onChange={(e)=>setAddress(e.target.value)} id="address" />
                    </div>
                    <div className="label">
                        <label>Password</label>
                    </div>
                    <div className="input">
                        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} id="password" />
                    </div>

                    <button type="submit" id="submit-button">SignUp</button>

                    {
                        warning ? <p className="warning-message">{warning}</p> : ''
                    }
                </form>
            </div>
            <h5 className="already-account">Already have an account? <span onClick={()=>navigate('/login')}>Login</span></h5>
        </div>
    )
}

export default Signup
