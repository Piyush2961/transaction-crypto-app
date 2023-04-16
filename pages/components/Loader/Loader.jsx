import React from "react";
import styles from "../../../styles/Loader.module.css";
const Loader = () => {
  return (
    <div className={styles.upperload}>
      <div className={styles.ellipse}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
