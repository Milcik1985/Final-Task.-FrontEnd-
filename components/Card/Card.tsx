import React from "react";
import styles from "./Card.module.css";
import Link from "next/link";

export type CardProps = {
  id: string;
  date: Date;
  question_text: string;
};

const Card = ({ date, question_text }: CardProps) => {
  return <Link href="#" className={styles.wrapper}></Link>;
};

export default Card;
