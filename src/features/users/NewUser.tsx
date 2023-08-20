import { useState } from "react";
import "../../css/NewUser.css";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import MyButton from "../../components/MyButton";

const NewUser = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const handleReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setIsAdmin(false);
  };

  const handleAddNewUser = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    await addNewUser({ username, password, isAdmin });

    if (isSuccess) {
      alert("User has been added successfully");
      navigate("/admin/users");
    } else if (isError) {
      alert("Something went wrong");
    }
  };

  return (
    <main className="new-user">
      <h1>Add new user</h1>
      <form action="" className="new-user__form">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          autoComplete="new-username"
          value={username}
          onChange={({ currentTarget }) => setUsername(currentTarget.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={({ currentTarget }) => setPassword(currentTarget.value)}
        />
        <label htmlFor="confirm-password">Confirm password</label>
        <input
          type="password"
          id="confirm-password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={({ currentTarget }) =>
            setConfirmPassword(currentTarget.value)
          }
        />
        <div className="checkbox-div">
          <label htmlFor="admin">Admin</label>
          <input
            type="checkbox"
            id="admin"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />
        </div>
        <div className="new-user__buttons">
          <MyButton className="button" onClick={handleAddNewUser}>
            Add user
          </MyButton>
          <MyButton className="button danger-button" onClick={handleReset}>
            Reset
          </MyButton>
        </div>
      </form>
    </main>
  );
};

export default NewUser;
