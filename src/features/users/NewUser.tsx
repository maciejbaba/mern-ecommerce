import { useState } from "react";
import "../../css/NewUser.css";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const handleReset = (e) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setIsAdmin(false);
  };

  const handleAddNewUser = (e) => {
    handleReset(e);
    // should validate the form here and be awaited
    addNewUser({ username, password, isAdmin }); // todo add result handling
  };

  const navigate = useNavigate();

  return (
    <main className="new-user">
      <h1>Add new user</h1>
      <form action="" className="new-user__form">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <label htmlFor="confirm-password">Confirm password</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
        />
        <div>
          <label htmlFor="admin">Admin</label>
          <input
            type="checkbox"
            id="admin"
            value={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />
        </div>
        <MyButton onClick={handleAddNewUser}>Add</MyButton>
        <MyButton onClick={handleReset}>Reset</MyButton>
      </form>
    </main>
  );
};

export default NewUser;
