import React, { useEffect, useState } from "react";
import styles from "./QuestionCard.module.css";
import { QuestionType } from "../../types/question";
import Button from "../Button/Button";
import { useRouter } from "next/router";
import cookies from "js-cookie";
import axios from "axios";
import { AnswerType } from "../../types/answer";
import LikeButton from "../LikeButton/likeButton";

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
      const token = cookies.get("jwt_token");

      if (!token) {
        setAuthorizationMessage(
          "Only logged in users are allowed to perform actions. Redirecting to login page..."
        );
        setTimeout(() => {
          router.push("/login");
        }, 5000);
        return;
      }

      const newAnswer = {
        answer_text: answerText,
        userName: userName,
      };

      const headers = {
        authorization: token,
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

  const deleteQuestion = async (questionId: string) => {
    try {
      const token = cookies.get("jwt_token");

      if (!token) {
        setAuthorizationMessage(
          "Only logged in users are allowed to perform actions. Redirecting to login page..."
        );
        setTimeout(() => {
          router.push("/login");
        }, 5000);
        return;
      }

      const headers = { authorization: token };

      const deleteResponse = await axios.delete(
        `${process.env.SERVER_URL}/questions/${questionId}`,
        { headers }
      );

      if (deleteResponse.status === 200) {
        viewAllAnswers();
        setAuthorizationMessage("The question was deleted successfully");

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (err) {
      console.log("Error deleting question:", err);
      setAuthorizationMessage(
        "Error occurred while trying to delete the question"
      );
    }
  };

  const deleteAnswer = async (answerId: string) => {
    try {
      const token = cookies.get("jwt_token");

      if (!token) {
        setAuthorizationMessage(
          "Only logged in users are allowed to perform actions. Redirecting to login page..."
        );
        setTimeout(() => {
          router.push("/login");
        }, 5000);
        return;
      }

      const headers = { authorization: token };

      const deleteResponse = await axios.delete(
        `${process.env.SERVER_URL}/answer/${answerId}`,
        { headers }
      );

      if (deleteResponse.status === 200) {
        viewAllAnswers();
        setAuthorizationMessage("The answer was deleted successfully");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
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
      <div className={styles.deleteQuestionWrapper}>
        <p>
          <span className={styles.text}>Posted By:</span> {question.userName}
        </p>
        <Button
          isLoading={isLoading}
          onClick={() => deleteQuestion(question._id)}
          title="Delete Question"
          className={styles.cardButton}
        />
      </div>

      <div className={styles.buttonWrapper}>
        {!showTextArea && (
          <Button
            className={styles.cardButton}
            isLoading={isLoading}
            onClick={() => setShowTextArea(true)}
            title="Post An Answer"
          />
        )}

        <Button
          isLoading={isLoading}
          onClick={() => {
            setShowAnswers(!showAnswers);
          }}
          title={showAnswers ? "Hide Answers" : "View All Answers"}
          className={styles.cardButton}
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
            className={styles.cardButton}
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
              <div className={styles.answerBtnWrapper}>
                <LikeButton ansId={ans._id} />
                <Button
                  isLoading={isLoading}
                  onClick={() => deleteAnswer(ans._id)}
                  title="Delete Answer"
                  className={styles.cardButton}
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
