import { useEffect, useState } from 'react'
import styles from './Loading.module.scss'

const Loading = () => {
  const [dots, setDots] = useState('')

  useEffect(() => {
    setTimeout(() => {
      if (dots.length > 2) setDots('')
      else setDots((prev) => prev + '.')
    }, 150)
  }, [dots])

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingElement}>
        <p className={styles.loadingText}>Loading{dots}</p>
      </div>
    </div>
  )
}

export default Loading
