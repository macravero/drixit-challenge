import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import styles from './user.module.scss'
import Error from '../Error/Error'
import UserData from '../userData/UserData'
import * as C from '../../shared/constants'


const User = () => {

  const [userData, setUserData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState({isError: false, message: ''});
  const token = localStorage.getItem(C.TOKEN_NAME);

  useEffect(()=>{
    const config = {
      headers: {
        'Accept': '*/*',
        'auth-token': token
      }
    }
    const getUser = async () =>{
      if (token){
      try{
        const url = `${C.ENDPOINTS.BASE}${C.ENDPOINTS.USER}`;
        const res = await axios.get(url, config)
        setUserData(res.data);
        setLoading(false);
      } catch(err){
        localStorage.removeItem(C.TOKEN_NAME)
        setError({
          isError: true,
          message: err.response.data
        });
      }
    }
    }
    getUser();
  },[token])
  
  return (
    <div className={styles.User}>
      {error.isError && <Error message={error.message}/>}
      {!loading && <UserData data={userData} />}
      {!token && 
      <div>
        <h2>You need to be logged in to see this page.</h2>
        <Link to ='/login'>Go back</Link>
      </div>}
    </div>
  )
}

export default User
