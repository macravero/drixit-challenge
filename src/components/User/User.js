/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import styles from './user.module.scss'
import UserData from '../userData/UserData'
import { ErrorContext } from '../../context/errorContext'
import * as C from '../../shared/constants'


const User = () => {

  const [userData, setUserData] = useState({})
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem(C.TOKEN_NAME);
  const {showError } = useContext(ErrorContext)

  useEffect(()=>{
    const config = {
      headers: {
        'Accept': '*/*',
        'auth-token': token
      },
      timeout: 2000
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
        showError({
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
