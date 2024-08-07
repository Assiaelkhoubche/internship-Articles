import React, { useEffect, useState } from 'react'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/constant';
import {jwtDecode} from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import Register from '../pages/Register';

const AuthButton = () => {
   
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate=useNavigate();

    useEffect(()=>{
              
       const token =localStorage.getItem(ACCESS_TOKEN);
       console.log(token)
       if(token){
           try{
            const decoded=jwtDecode(token);
            const isTokenValid= decoded.exp*1000>Date.now();
            setIsAuthenticated(isTokenValid);
            
           }catch(err){
             setIsAuthenticated(false)
           }

       }

    },[])

    const handleLogout=()=>{
       localStorage.removeItem(ACCESS_TOKEN);
       localStorage.removeItem(REFRESH_TOKEN);
        setIsAuthenticated(false);
        navigate('/');

    }
    
    const handleRegistartion=()=>{
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setIsAuthenticated(true);
        navigate('/register');
    }


  return (
    <div className='text-white font-medium'>
         {isAuthenticated?(
             
             <button 
                onClick={handleLogout}
                className='bg-n-1 px-3 pb-1  rounded-[5px] hover:bg-n-2 hover:text-n-1 duration-500 ease-in '
              >
                  Logout
             </button>

         ):(
                <button 
                    onClick={handleRegistartion}
                    className='bg-n-1 px-3 pb-1  rounded-[5px] hover:bg-n-2 hover:text-n-1 duration-500 ease-in '
                 >
                   Sign up / Login
                </button>
         )}
    </div>
  )
}

export default AuthButton
