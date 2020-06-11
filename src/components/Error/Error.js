import React, {useContext} from 'react'
import styles from './error.module.scss'
import { ErrorContext } from '../../context/errorContext'


const Error = () => {

  const { error } = useContext(ErrorContext);

  return (
    error.isError && <div className={styles.Error}>
      {error.message}
    </div>
  )
}

export default Error
