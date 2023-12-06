import React, { useEffect, useState } from 'react'
import profileImg from '../../Assets/icon.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function UserDetail() {
    const [userDetails, setUserDetails] = useState()

    const navigate = useNavigate();

    useEffect(()=>{

        const token = localStorage.getItem('token');
        
        if(!localStorage.getItem('token')){
            navigate('/');
            return
        }

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/user-details`,{
            headers : {
                sky_goals : token
            }
        })
        .then((res)=>{
            console.log(res.data.data);
            setUserDetails(res.data.data);
        })
        .catch((err)=>{
            console.log("error message ",err);
        })
    }, [navigate])

    const logoutHandler = ()=>{
        localStorage.clear();
        navigate('/login')
    }

    return (
        <section className="details-container">
            <div className="success">User Details</div>
            <div id="details">
                <div id="user-info">
                    <p className="profile-heading">Profile</p>
                    <div className="image"><img src={profileImg} alt="pic" /></div>
                    
                    {
                        userDetails ? (
                            <div className="user-details">
                                <p className="name">Full Name : {userDetails.name}</p>
                                <p className="username">Username : {userDetails.username}</p>
                                <p className="email">Email : {userDetails.email}</p>
                                <p className="gender">Gender : {userDetails.gender}</p>
                                <p className="address">Address : {userDetails.address}</p>
                            </div>
                        ) : ''
                    }
                </div>
                <button type="button" onClick={logoutHandler} id="logout-button">LOGOUT</button>
            </div>
        </section>
    )
}

export default UserDetail
