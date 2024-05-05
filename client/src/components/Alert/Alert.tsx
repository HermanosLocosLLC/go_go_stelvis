import { AlertTypes } from '../../store/appReducer/appTypes'

import styles from './Alert.module.scss'

type Props = {
  message: string
  type: AlertTypes | ''
}

const Alert = ({ message, type }: Props) => {
  return (
    <div className={styles[`alertContainer${type}`]}>
      <p className={styles.alertText}>{message}</p>
    </div>
  )
}

export default Alert
