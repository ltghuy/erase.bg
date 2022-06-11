import React from 'react'
import Button from '../Button'
import styles from './productItem.module.scss'

interface ProductItemProps {
    text: string,
    logo: string
    borderColor: string
}

const ProductItem : React.FC<ProductItemProps> = ( { text, logo, borderColor }) => {
  return (
    <div className={`${styles.item} ${borderColor}`}>
        <p>
            <img src={logo} alt="product items" />
        </p>
        <p>
            { text }
        </p>
        <div className={styles.item__button}>
            <Button>
                Try now for free
            </Button>
        </div>
    </div>
  )
}

export default ProductItem