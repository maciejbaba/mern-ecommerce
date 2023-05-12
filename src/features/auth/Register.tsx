import { useAddNewUserMutation } from "../users/usersApiSlice";
import React, { useState } from "react";
import "../../css/Register.css";
import MyButton from "../../components/myButton";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [addNewUser, { isLoading }] = useAddNewUserMutation();

  const handleRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    addNewUser({ username, password });
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    alert("Registration successful");
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.currentTarget.value);
  };

  return (
    <main className="register">
      <h1>Register</h1>
      <form action="" className="register__form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <MyButton onClick={handleRegister} style={{ padding: ".2rem" }}>
          Register
        </MyButton>
      </form>
    </main>
  );
};

export default Register;
