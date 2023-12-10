import React, { useEffect } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import "./successregister.scss"
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {toast} from "react-toastify"

const SuccessRegister = () => {
    const {email, verification} = useParams()
    const handleSubmit = async()=>{
        await axios.post(`${process.env.REACT_APP_API}/api/auth/verify-email/${email}/${verification}`)
    }

    useEffect(()=>{
        handleSubmit()
        toast.success("Your account verified")
    })
  return (
    <div className='successregister'>
        <br /><br />
        <Navbar type={"slider-navbar"}/>
        <div className="successregister-container">
            <h1>Your account verified</h1><br />
            <h1>Now Go back to login Please! <a href="/registration/login">Login</a></h1>
        </div>
    </div>
  )
}

export default SuccessRegister