import React from 'react'
import styles from './form.module.scss'

const Form = ({handleLogin, handleFormChange, validEmail, formData}) => {
  return (
    <form className={styles.Form} onSubmit={handleLogin}>

        <label htmlFor="email">Email</label>
        <input type="email" autoComplete='email' value={formData.email} onChange={handleFormChange} name="email"/>
        {validEmail && (
          <>
          <label htmlFor="contraseña">Contraseña</label>
          <input type="password" autoComplete='current-password' value={formData.password} name="password" onChange={handleFormChange}/>
          </>)}
        <button type='submit'>Ingresar</button>
    </form>
  )
}

export default Form
