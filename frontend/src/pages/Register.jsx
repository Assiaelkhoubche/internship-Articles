import React from 'react'
import UserForm from '../components/UserForm'
const Register = () => {
  return (
    <div className='py-40'>
          <UserForm route='/api/user/register/' method='register'/>
    </div>
  )
}

export default Register
