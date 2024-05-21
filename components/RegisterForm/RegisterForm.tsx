import React, { useState } from "react";
import styles from "./RegisterForm.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Button from "../Button/Button";

const RegisterForm = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const onRegister = async () => {
    setLoading(true);
    const signInBody = {
      userName: userName,
      email: email,
      password: password,
    };

    if (!userName || !email || !password) {
      setError(true);
      setLoading(false);
      return;
    }

    setError(false);

    try {
      const response = await axios.post(
        `${process.env.SERVER_URL}/users`,
        signInBody
      );

      if (response.status === 200) {
        setSuccessMessage("Registration successful, redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      }

      setLoading(false);

      console.log("response", response);
    } catch (err) {
      console.log("Error:", err);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.background}>
        <div className={styles.content}>
          <h1>Register Here</h1>
          <input
            className={styles.input}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="User Name"
          />
          <input
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Button isLoading={isLoading} onClick={onRegister} title="Register" />
          {isError && (
            <div className={styles.error}>
              Invalid username, email, or password
            </div>
          )}

          {successMessage && (
            <div className={styles.success}>{successMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
