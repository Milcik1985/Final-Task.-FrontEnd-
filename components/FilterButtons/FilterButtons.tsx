import React from "react";
import Button from "../Button/Button";
import styles from "./FilterButtons.module.css";
import Link from "next/link";

const FilterButtons = () => {
  return (
    <div className={styles.filterBtns}>
      <Link href="/unanswered-questions">
        <Button
          title="Unanswered Questions"
          onClick={() => {}}
          isLoading={false}
          className={styles.filterBtnText}
        />
      </Link>
      <Link href="/answered-questions">
        <Button
          title="Answered Questions"
          onClick={() => {}}
          isLoading={false}
          className={styles.filterBtnText}
        />
      </Link>
    </div>
  );
};

export default FilterButtons;
