import React, { useState } from 'react'
import "./resetpassword.scss"
import Navbar from '../../../components/navbar/Navbar'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  const {email, verification} = useParams()
  const navigate = useNavigate()
  
  const [newPassword, setNewPassword] = useState("")

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      const response = await axios.post(`${process.env.REACT_APP_API}/api/auth/reset-password/${email}/${verification}`, {
        password: newPassword
      })
      if(response){
        navigate("/registration/login")
      }else{
        toast.error("something went wrong")
      }
    }catch{
      toast.error("something went wrong")
    }
  }
  return (
    <div className='resetpassword'>
        <br /><br />
        <Navbar type={"slider-navbar"}/>
        <form onSubmit={handleSubmit}>
            <input type="password" placeholder='New Password' value={newPassword} onChange={(e)=> setNewPassword(e.target.value)}/>
            <button type='submit'>New Password</button><br /> 
        </form>
    </div>
  )
}

export default ResetPassword