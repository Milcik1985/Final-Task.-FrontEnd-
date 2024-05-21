import React, { useState } from "react";
import styles from "./PostQuestion.module.css";
import Button from "../Button/Button";
import { useRouter } from "next/router";
import cookies from "js-cookie";
import axios from "axios";

const PostQuestionForm = () => {
  const router = useRouter();
  const [questionText, setQuestionText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const postQuestion = async () => {
    setLoading(true);
    setError("");
    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      const response = await axios.post(
        `${process.env.SERVER_URL}/questions`,
        {
          question_text: questionText,
        },
        { headers }
      );

      if (response.status === 200) {
        router.push("/all-questions");
      } else {
        setError("Something went wrong. Failed to post a question");
      }
    } catch (err) {
      console.log("Error:", err);
      setError("Error occured. Please Try Again.");
    }
    setLoading(false);
  };
  return (
    <div className={styles.textareaWrapper}>
      <div className={styles.background}>
        <div className={styles.content}>
          <h1>Type Your Question Here</h1>
          <textarea
            className={styles.textArea}
            placeholder="Type Your Question Here"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
          {error && <p className={styles.error}>{error}</p>}
          <Button
            isLoading={isLoading}
            onClick={postQuestion}
            title="Post Question"
          />
        </div>
      </div>
    </div>
  );
};

export default PostQuestionForm;
