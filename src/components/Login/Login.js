import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import Form from '../Form/Form';
import Logo from '../../media/logo.jpeg';
import styles from './login.module.scss';
import { ErrorContext } from '../../context/errorContext'
import * as C from '../../shared/constants'

const Login = ({history}) => {
  const [formData, setFormData] = useState({email:'', password: ''})
  const [validEmail, setValidEmail] = useState(false);
  const {showError} = useContext(ErrorContext)

  useEffect(()=>{
      const validity = C.REGEX_PATTERNS.EMAIL.test(formData.email.toLowerCase());
      setValidEmail(validity);
  },[formData])

  const handleFormChange = ({target: {name, value} }) =>{
    setFormData({
      ...formData,
      [name]: value
    })
  };

  const handleLogin = async e =>{
    e.preventDefault();
    try {
      const url = `${C.ENDPOINTS.BASE}${C.ENDPOINTS.LOGIN}`;
      const res = await axios.post(url,formData, {timeout: 2000})
      localStorage.setItem(C.TOKEN_NAME, res.data)
      history.push('/user');
    } catch(err){
      const errorMessage = err.message.includes('timeout') ? 'The request timed out' : err.response.data;
      showError({
        isError: true,
        message: errorMessage
      })
    }
  }

  return (
    <div className={styles.Login}>
      <img src={Logo} alt="Drixit technologies logo"/>
      <h1>DRIXIT</h1>
      <h2>TECHNOLOGIES</h2>
      <Form handleLogin={handleLogin} handleFormChange={handleFormChange} validEmail={validEmail} formData={formData} />
    </div>
  )
}

export default Login
