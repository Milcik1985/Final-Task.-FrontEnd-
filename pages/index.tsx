import React, { useEffect, useState } from "react";
import axios from "axios";
import cookies from "js-cookie";
import Link from "next/link";
import PageTemplate from "../components/PageTemplate/PageTemplate";
import { useRouter } from "next/router";
import { QuestionType } from "../types/question";

const Index = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuestionType[] | null>([]);

  const fetchedQuestions = async () => {
    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      const response = await axios.get(`${process.env.SERVER_URL}/questions`, {
        headers,
      });

      setQuestions(response.data.games);
      console.log(response);
    } catch (err) {
      // @ts-expect-error
      if (err.response.status === 401) {
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    fetchedQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageTemplate>
      <div>
        <Link href="/answer-question">Place Your Answer</Link>
      </div>
    </PageTemplate>
  );
};

export default Index;
