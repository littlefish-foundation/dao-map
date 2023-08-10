// CategoryHeader.jsx
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import styles from "./CategoryHeader.module.css";

const CategoryHeader = ({ category, onBackClick }) => {
  return (
    <div className={styles.container} onClick={onBackClick}>
      <AiOutlineArrowLeft size={25} className={styles.backArrow} />
      <h2 className={styles.categoryName}>{category}</h2>
    </div>
  );
};

export default CategoryHeader;
