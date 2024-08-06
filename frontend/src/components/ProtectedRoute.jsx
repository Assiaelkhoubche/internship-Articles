import { useEffect, useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/constant";
import api from '../api'
import {Navigate} from 'react-router-dom'



const ProtectedRoute = ({children}) => {

    const [isAuthorized, setIsAuthorized]=useState(null);
    
    useEffect(()=>{
        auth().catch(()=>setIsAuthorized(false))
    })

    const refreshToken = async ()=>{
         const refreshToken=localeStorage.get(REFRESH_TOKEN);
        try{
            const res=await api.post('/api/token/refresh/',{
                refresh:refreshToken
            });

            if(res===200){
                localeStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(True);
            }else{
                setIsAuthorized(false);
            }
         
        }catch(error){
            console.log(error);
            setIsAuthorized(false);
         }
    }


    const auth = async()=>{
        const token= localeStorage.getItem(ACCESS_TOKEN);

        if(!token){
            setIsAuthorized(false);
            return
        }

        const decoded=jwtDecode(token);
        const tokenExpiration=decoded.exp;
        const now=Date.now()/1000

        if(tokenExpiration<now){
            await refreshToken();
        }else{
            setIsAuthorized(true);
        }
    }


    if(isAuthorized===null){
    return (
        <div>
            Loading ...
        </div>
    )
    }

    return isAuthorized? children: <Navigate to='/login'/>

}

export default ProtectedRoute
