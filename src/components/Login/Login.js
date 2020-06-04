import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Form from '../Form/Form';
import Error from '../Error/Error'
import Logo from '../../media/logo.jpeg';
import styles from './login.module.scss';
import * as C from '../../shared/constants'

const Login = ({history}) => {
  const [formData, setFormData] = useState({email:'', password: ''})
  const [validEmail, setValidEmail] = useState(false);
  const [error, setError] = useState({isError: false, message: ''})

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
      const res = await axios.post(url,formData)
      localStorage.setItem(C.TOKEN_NAME, res.data)
      history.push('/user');
    } catch(err){
      setError({
        isError: true,
        message: err.response.data
      })
    }
  }

  return (
    <div className={styles.Login}>
      {error.isError && <Error message={error.message} />}
      <img src={Logo} alt="Drixit technologies logo"/>
      <h1>DRIXIT</h1>
      <h2>TECHNOLOGIES</h2>
      <Form handleLogin={handleLogin} handleFormChange={handleFormChange} validEmail={validEmail} formData={formData} />
    </div>
  )
}

export default Login
