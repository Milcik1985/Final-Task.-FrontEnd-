import { AnswerType } from "./answer";

export type QuestionType = {
  _id: string;
  user_id: string;
  userName: string;
  date: Date;
  question_text: string;
  answers?: AnswerType[];
};
