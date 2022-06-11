import React from 'react'
import ProductItem from '../../components/ProductItem'
import styles from './product_list.module.scss'

const ProductList = () => {
  return (
    <div className={styles.product_list}>
        <h3 className={styles.title}>Try Our Other Products</h3>
            <div className={styles.container}>
              <ProductItem 
                logo='/images/upscale-logo.png'
                text='Upscale.media is an AI image upscaling tool that lets you enlarge &amp; enhance your images for FREE.'
                borderColor='green'
              />
              <ProductItem 
                logo='/images/watermark-logo.png'
                text='Watermarkremover.io is an AI watermark-remover tool that lets you remove watermarks from images for FREE.'
                borderColor='yellow'
              />
              <ProductItem 
                logo='/images/shrink-logo.png'
                text='Shrink.media reduces the size of your images using intelligent compression technique for FREE.'
                borderColor='purple'
              />
            </div>
            <img src="/images/gradient.svg" alt="gradient background" className={styles.bg}/>
    </div>
  )
}

export default ProductList