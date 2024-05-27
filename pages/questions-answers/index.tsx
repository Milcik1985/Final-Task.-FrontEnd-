import React, { useState, useEffect } from "react";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import QuestionCardWrapper from "../../components/QuestionCardWrapper/QuestionCardWrapper";
import styles from "../../styles/Home.module.css";
import { QuestionType } from "../../types/question";
import axios from "axios";
import Button from "../../components/Button/Button";

const Index = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${process.env.SERVER_URL}/questions`);
        setQuestions(response.data.questions);
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

export default Index;
