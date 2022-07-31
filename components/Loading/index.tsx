import React from "react";
import styles from "./loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.dots}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
      <h3 className={styles.title}>Processing image, please wait...</h3>
    </div>
  );
};

export default Loading;
