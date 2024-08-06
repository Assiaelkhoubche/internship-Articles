import React from 'react'
import UserForm from '../components/UserForm'

const Login = () => {
  

  return (
    <div className='py-40'>
       <UserForm route='/api/token/' method='login'/>
    </div>
  )
}

export default Login
