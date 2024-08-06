import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/constant';
import LoadingIndicator from './LoadingIndicator';

const UserForm = ({route, method}) => {

    const [username, setUserNmae]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [loading, setLoading]= useState(false);

    const navigate=useNavigate();
    const name=method==='login'?'Login':'Sign up'
    
    const handleSubmit=async (e)=>{

        e.preventDefault();
        setLoading(true);

        try{

            const res= await api.post(route, {username, email, password});
            if(method==='login'){

                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate('/');
            }else{
                navigate('/login')
            }

        }catch(err){

            if(err.response){
                alert(JSON.stringify(err.response.data));
            }else if(err.request){
                alert('No response from the server');
            }else{
                alert('error: '+err.message);
            }
        }finally{
            setLoading(false);
        }
    }
  return (
     <form onSubmit={handleSubmit} className='form-container'>
          <h1>{name}</h1>
          { method==='register' && (
            <input 
              className='form-input'
              type="text"
              value={username}
              onChange={(e)=>setUserNmae(e.target.value)}
              placeholder='username...'
              
              />
          )}
          <input type="email"
                 className='form-input'
                 onChange={(e)=>setEmail(e.target.value)}
                 value={email} 
                 placeholder='example@gmail.com' 
          />
          <input type="password"
                 className='form-input'
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                 placeholder='password...'
          />
          
          {loading && <LoadingIndicator/>}

          <button
             className='form-button'
             type='submit'
          >
              {name}
          </button>


     </form>
  )
}

export default UserForm
