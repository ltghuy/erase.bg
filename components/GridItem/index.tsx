import React from 'react'
import styles from './grid_item.module.scss'
interface GridItemProps {
  item: {title: string, logo: string, desc: string}
}
const GridItem: React.FC<GridItemProps> = ({item}) => {
  return (
    <div className={styles.wrapper}>
        <img src={item.logo} alt="grid icon" />
        <div className={styles.content}>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
        </div>
    </div>
  )
}

export default GridItem
