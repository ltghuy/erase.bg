import React, { useRef } from "react";
import styles from "./questionItem.module.scss";

interface QuestionItemProps {
  item: { title: string; dropdown: string };
}
const QuestionItem: React.FC<QuestionItemProps> = ({ item }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);

  const toggleDropdown = () => {
    if (dropdownRef.current && iconRef.current) {
      dropdownRef.current.classList.toggle("show");
      iconRef.current.classList.toggle("rotate");
    }
  };
  return (
    <div className={styles.item}>
      <div className={styles.item__top} onClick={toggleDropdown}>
        <p>{item.title}</p>
        <img
          ref={iconRef}
          src="/images/arrow.svg"
          alt="arrow icon"
          className={styles.item__arrow}
        />
      </div>
      <div className={styles.item__dropdown} ref={dropdownRef}>
        {item.dropdown}
      </div>
    </div>
  );
};

export default QuestionItem;
