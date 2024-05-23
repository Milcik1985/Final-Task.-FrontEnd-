import React from "react";
import QuestionCard from "../QuestionCard/QuestionCard";
import styles from "./QuestionCardWrapper.module.css";
import { QuestionType } from "../../types/question";

type QuestionCardsProps = {
  questions: QuestionType[];
};

const QuestionCardWrapper: React.FC<QuestionCardsProps> = ({ questions }) => {
  console.log("Questions Prop:", questions);

  return (
    <div className={styles.cardWrapper}>
      {Array.isArray(questions) && questions.length > 0 ? (
        questions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))
      ) : (
        <p>No questions available</p>
      )}
    </div>
  );
};

export default QuestionCardWrapper;
