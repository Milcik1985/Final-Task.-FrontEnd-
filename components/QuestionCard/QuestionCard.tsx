import React, { useEffect, useState } from "react";
import styles from "./QuestionCard.module.css";
import { QuestionType } from "../../types/question";
import Button from "../Button/Button";
import { useRouter } from "next/router";
import cookies from "js-cookie";
import axios from "axios";
import { AnswerType } from "../../types/answer";

type QuestionCardProps = {
  question: QuestionType;
  isLoading?: boolean;
};

const QuestionCard = ({ question, isLoading = false }: QuestionCardProps) => {
  const router = useRouter();
  const [showTextArea, setShowTextArea] = useState(false);
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [userName, setUserName] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [showAnswers, setShowAnswers] = useState(false);
  const [authorizationMessage, setAuthorizationMessage] = useState("");

  useEffect(() => {
    const storedUserName = cookies.get("userName");
    if (storedUserName) {
      setUserName(storedUserName);
      console.log(`stored username: ${storedUserName}`);
    }
    viewAllAnswers();
  }, []);

  const viewAllAnswers = async () => {
    try {
      const response = await axios.get(
        `${process.env.SERVER_URL}/question/${question._id}/answers`
      );

      if (response.data && response.data.answers) {
        setAnswers(response.data.answers);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleAnswerTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAnswerText(e.target.value);
  };

  const postAnswer = async () => {
    try {
      const newAnswer = {
        answer_text: answerText,
        userName: userName,
      };

      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      const response = await axios.post(
        `${process.env.SERVER_URL}/question/${question._id}/answers`,
        newAnswer,
        { headers }
      );

      console.log(response);

      if (response.status === 201) {
        viewAllAnswers();
        setAnswerText("");
        setShowTextArea(false);
      }
    } catch (err) {
      console.log("Error posting answer:", err);
    }
  };

  const deleteAnswer = async (answerId: string) => {
    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      console.log(`Deleting answer with ID: ${answerId}`);

      const deleteResponse = await axios.delete(
        `${process.env.SERVER_URL}/answer/${answerId}`,
        { headers }
      );

      if (deleteResponse.status === 200) {
        viewAllAnswers();
        setAuthorizationMessage("the answer was deleted successfully");
      }
    } catch (err) {
      console.log("Error deleting answer:", err);
      setAuthorizationMessage(
        "Error occurred while trying to delete the answer"
      );
    }
  };

  const formattedDate = new Date(question.date).toLocaleDateString();
  return (
    <div className={styles.container}>
      <p>
        <span className={styles.text}>Question:</span> {question.question_text}
      </p>
      <p>
        <span className={styles.text}>Posted On:</span> {formattedDate}
      </p>
      <p>
        <span className={styles.text}>Posted By:</span> {question.userName}
      </p>

      <div className={styles.buttonWrapper}>
        {!showTextArea && (
          <Button
            isLoading={isLoading}
            onClick={() => setShowTextArea(true)}
            title="Post An Answer"
            className={styles.answerButton}
          />
        )}

        <Button
          isLoading={isLoading}
          onClick={() => {
            setShowAnswers(!showAnswers);
          }}
          title={showAnswers ? "Hide Answers" : "View All Answers"}
          className={styles.answerButton}
        />
      </div>

      {showTextArea && (
        <div>
          <textarea
            className={styles.textArea}
            value={answerText}
            onChange={handleAnswerTextChange}
            placeholder="Enter Your Answer"
          />
          <Button
            isLoading={isLoading}
            onClick={postAnswer}
            title="Submit"
            className={styles.answerButton}
          />
        </div>
      )}

      {showAnswers && answers.length > 0 && (
        <div className={styles.answerContainer}>
          {answers.map((ans) => (
            <div key={ans._id} className={styles.singleAnswer}>
              <p>
                <span className={styles.text}>Answer:</span> {ans.answer_text}
              </p>
              <p>
                <span className={styles.text}>Posted On:</span>{" "}
                {new Date(ans.date).toLocaleDateString()}
              </p>
              <p>
                <span className={styles.text}>Posted By:</span> {ans.userName}
              </p>
              <div className={styles.deleteButtonWrapper}>
                <Button
                  isLoading={isLoading}
                  onClick={() => deleteAnswer(ans._id)}
                  title="Delete Answer"
                  className={styles.deleteButton}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {authorizationMessage && (
        <div>
          <p className={styles.deleteBan}>{authorizationMessage}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
