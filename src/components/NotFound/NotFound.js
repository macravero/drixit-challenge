import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NotFound.module.scss'
const NotFound = () => {
  return (
    <div className={styles.NotFound}>
        <h2>Page not found :(</h2>
        <Link to ='/login'>Go back</Link>
      </div>
  )
}

export default NotFound
