import React from "react";
import styles from "./Button.module.css";
import Spinner from "../Spinner/Spinner";

type ButtonProps = {
  onClick: () => void;
  isLoading: boolean;
  title: string;
  type?: "WARNING" | "NORMAL";
  className?: string;
  isAvailable?: boolean;
};

const Button = ({
  onClick,
  isLoading,
  title,
  type,
  className,
  isAvailable = false,
}: ButtonProps) => {
  return (
    <button
      className={`${styles.mainButton} ${
        type === "WARNING" ? styles.warning : ""
      } ${isAvailable ? styles.available : ""} ${className ? className : ""}`}
      onClick={onClick}
    >
      {isLoading ? <Spinner /> : <>{title}</>}
    </button>
  );
};

export default Button;
