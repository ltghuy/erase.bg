import React from "react";
import styles from "./button.module.scss";

interface ButtonProp {
  children: any;
  size?: string;
  handleRemove?: any;
  handClick?: any;
  downLoad?: boolean;
}
const Button: React.FC<ButtonProp> = ({
  children,
  size,
  handleRemove,
  handClick,
  downLoad = false,
}) => {
  return (
    <>
      {downLoad ? (
        <a
          className={`${styles.button} ${styles[`button__size-${size}`]}`}
          onClick={handClick}
        >
          {children}
        </a>
      ) : (
        <button
          className={`${styles.button} ${styles[`button__size-${size}`]}`}
          onClick={handClick}
        >
          <input
            type="file"
            className={styles.input_file}
            onChange={handleRemove}
          />
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
