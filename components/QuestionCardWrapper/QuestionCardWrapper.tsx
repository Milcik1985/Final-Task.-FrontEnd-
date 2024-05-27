import React, { useEffect, useState } from "react";
import QuestionCard from "../QuestionCard/QuestionCard";
import styles from "./QuestionCardWrapper.module.css";
import { QuestionType } from "../../types/question";
import FilterButtons from "../FilterButtons/FilterButtons";

type QuestionCardsProps = {
  questions: QuestionType[];
};

const QuestionCardWrapper: React.FC<QuestionCardsProps> = ({ questions }) => {
  return (
    <>
      <FilterButtons />
      <div className={styles.cardWrapper}>
        {Array.isArray(questions) && questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard key={question._id} question={question} />
          ))
        ) : (
          <p>No questions available</p>
        )}
      </div>
    </>
  );
};

export default QuestionCardWrapper;
