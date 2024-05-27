import React, { useState, useEffect } from "react";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import QuestionCardWrapper from "../../components/QuestionCardWrapper/QuestionCardWrapper";
import styles from "../../styles/Home.module.css";
import { QuestionType } from "../../types/question";
import axios from "axios";
import { AnswerType } from "../../types/answer";

const Index = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState<{ [key: string]: AnswerType[] }>({});

  useEffect(() => {
    const fetchQuestionsAndAnswers = async () => {
      try {
        setIsLoading(true);
        const questionResponse = await axios.get(
          `${process.env.SERVER_URL}/questions`
        );

        console.log("Fetched Questions:", questionResponse.data.questions);

        if (questionResponse.data && questionResponse.data.questions) {
          const fetchedQuestions = questionResponse.data.questions;
          setQuestions(fetchedQuestions);

          const answersMap: { [key: string]: AnswerType[] } = {};
          await Promise.all(
            fetchedQuestions.map(async (question: QuestionType) => {
              const answerResponse = await axios.get(
                `${process.env.SERVER_URL}/question/${question._id}/answers`
              );
              if (answerResponse.data && answerResponse.data.answers) {
                answersMap[question._id] = answerResponse.data.answers;
              }
            })
          );
          setAnswers(answersMap);
        }
        setIsLoading(false);
      } catch (err) {
        console.log("Error fetching data:", err);
        setIsLoading(false);
      }
    };
    fetchQuestionsAndAnswers();
  }, []);

  console.log("Questions:", questions);
  console.log("Answers:", answers);

  // Filter questions to only show those with answers
  const filteredQuestions = questions.filter(
    (question: QuestionType) =>
      answers[question._id] && answers[question._id].length > 0
  );

  console.log("Filtered Questions:", filteredQuestions);

  return (
    <PageTemplate>
      <div className={styles.mainPageContent}>
        <QuestionCardWrapper questions={filteredQuestions} />
      </div>
    </PageTemplate>
  );
};

export default Index;
