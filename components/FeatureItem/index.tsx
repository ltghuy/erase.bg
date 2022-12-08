import React from "react";
import styles from "./features_item.module.scss";

interface FeatureItemProps {
  reverse?: boolean;
  imagesUrl?: string;
  title: string;
  children: React.ReactNode;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  reverse,
  imagesUrl,
  title,
  children,
}) => {
  return (
    <div className={`${styles.item} ${reverse && styles.reverse}`}>
      <img src={imagesUrl} alt="features item" className={styles.item__image} />
      <div className={styles.item__content}>
        <h3 className={styles.item__title}>{title}</h3>
        <div className={styles.item__para}>{children}</div>
      </div>
    </div>
  );
};

export default FeatureItem;
