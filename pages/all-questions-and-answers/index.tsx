import React, { useEffect, useState } from "react";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import QuestionCardWrapper from "../../components/QuestionCardWrapper/QuestionCardWrapper";
import axios from "axios";
import { QuestionType } from "../../types/question";
import styles from "../../styles/Home.module.css";

const AllQuestions = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${process.env.SERVER_URL}/questions`);
        setQuestions(response.data as QuestionType[]);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    fetchQuestions();
  }, []);
  console.log("Questions:", questions);
  return (
    <PageTemplate>
      <div className={styles.mainPageContent}>
        <QuestionCardWrapper questions={questions} />
      </div>
    </PageTemplate>
  );
};

export default AllQuestions;
