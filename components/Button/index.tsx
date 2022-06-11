import React from 'react'
import { useRouter } from 'next/router'
import styles from './button.module.scss'

interface ButtonProp {
    children: any,
    size?: string,
    handleRemove?: any,
    handClick?: any,
    downLoad?: boolean
}
const Button: React.FC<ButtonProp> = ({ children, size, handleRemove, handClick, downLoad = false }) => {
  const router = useRouter()

  const handleClick = () => {
    handClick || router.push('/upload')
  }

  return (
    <>
      {
        downLoad ? 
        <a className={styles.button} onClick={handClick}>{children}</a> 
        : 
        <button className={`${styles.button} ${size}`} onClick={handleClick}>
            <input type="file" className={styles.input_file} onChange={handleRemove}/>
            {children}
        </button>
      }
    </>
  )
}

export default Button