import React from "react";
import Button from "../Button/Button";
import styles from "./FilterButtons.module.css";

const FilterButtons = () => {
  return (
    <div className={styles.filterBtns}>
      <a href="/unanswered-questions">
        <Button
          title="Unanswered Questions"
          onClick={() => {}}
          isLoading={false}
          className={styles.filterBtnText}
        />
      </a>
      <a href="/answered-questions">
        <Button
          title="Answered Questions"
          onClick={() => {}}
          isLoading={false}
          className={styles.filterBtnText}
        />
      </a>
    </div>
  );
};

export default FilterButtons;
