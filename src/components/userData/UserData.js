import React from 'react'
import {Link} from 'react-router-dom'
import styles from './userData.module.scss'
const UserData = ({data}) => {
  const {age, avatar, email, name, role, surname} = data
  return (
    <div className={styles.UserData}>
      <img src={avatar} alt=""/>
      <h1>{`${name} ${surname} - ${role}`}</h1>
      <p>{`Age: ${age}`}</p>
      <p>{`Email: ${email}`}</p>
      <Link to ='/login' onClick={()=> localStorage.removeItem('drixit-JWT')}>Log out</Link>
    </div>
  )
}

export default UserData
