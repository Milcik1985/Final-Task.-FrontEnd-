import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import cookie from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import Button from "../Button/Button";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState(false);
  const [isWrongData, setWrongData] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    const loginData = {
      email: email,
      password: password,
    };

    console.log(loginData);

    if (!email || !password) {
      setError(true);
      return;
    }

    setError(false);
    try {
      const response = await axios.post(
        `${process.env.SERVER_URL}/users/login`,
        loginData
      );

      if (response.status === 200) {
        setWrongData(false);
        console.log(response);
        cookie.set("jwt_token", response.data.jwt);
        router.push("/questions-answers");
      }
      console.log("response", response);
    } catch (err) {
      setWrongData(true);
      console.log("Error", err);
      setLoading(true);
    }
  };
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.background}>
        <div className={styles.content}>
          <h1>Login Here</h1>
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
          <Button isLoading={isLoading} onClick={onLogin} title="Login" />

          {isError && (
            <div className={styles.errorMessage}>
              Please Fill All The Inputs
            </div>
          )}

          {isWrongData && (
            <div className={styles.errorMessage}>
              Provided Data Is Incorrect
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
