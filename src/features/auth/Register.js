import { useAddNewUserMutation } from "../users/usersApiSlice";
import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [addNewUser, { isLoading }] = useAddNewUserMutation();
  return (
    <main>
      <h1>Register</h1>
      <form action="">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" />
        <button type="submit">Register</button>
      </form>
    </main>
  );
};

export default Register;
