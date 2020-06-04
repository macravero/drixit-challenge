import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Form from '../Form/Form';
import Error from '../Error/Error'
import Logo from '../../media/logo.jpeg';
import styles from './login.module.scss';

const Login = ({history}) => {
  const [formData, setFormData] = useState({email:'', password: ''})
  const [validEmail, setValidEmail] = useState(false);
  const [error, setError] = useState({isError: false, message: ''})


  useEffect(()=>{
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const validity = regex.test(formData.email.toLowerCase());
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
      const url = 'http://localhost:3001/api/v0/login';
      const res = await axios.post(url,formData)
      localStorage.setItem('drixit-JWT', res.data)
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
