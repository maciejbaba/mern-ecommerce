import { useAddNewUserMutation } from "../users/usersApiSlice";
import { useState } from "react";
import "../../css/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [addNewUser, { isLoading }] = useAddNewUserMutation();

  const handleRegister = e => {
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

  const handleUsernameChange = e => {
    setUsername(e.currentTarget.value);
  };
  const handlePasswordChange = e => {
    setPassword(e.currentTarget.value);
  };
  const handleConfirmPasswordChange = e => {
    setConfirmPassword(e.currentTarget.value);
  };

  return (
    <main className="register-main">
      <h1>Register</h1>
      <form action="" className="register-form">
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
        <button onClick={handleRegister} style={{ padding: ".2rem" }}>
          Register
        </button>
      </form>
    </main>
  );
};

export default Register;
