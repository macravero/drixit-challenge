import React from 'react'
import styles from './error.module.scss'

const Error = ({message}) => {
  return (
    <div className={styles.Error}>
      {`There has been an error: ${message}`}
    </div>
  )
}

export default Error
