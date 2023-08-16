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
        <label htmlFor="username">
          <strong>Username</strong>
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <label htmlFor="password">
          <strong>Password</strong>
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <label htmlFor="confirm-password">
          <strong>Confirm password</strong>
        </label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
        />
        <div className="new-user__input-container-admin">
          <label htmlFor="admin">
            <strong>Admin</strong>
          </label>
          <input
            type="checkbox"
            id="admin"
            value={isAdmin ? "true" : "false"}
            onChange={() => setIsAdmin(!isAdmin)}
          />
        </div>
        <div className="new-user__buttons">
          <MyButton
            className="new-user__buttons-add"
            onClick={handleAddNewUser}
          >
            Add user
          </MyButton>
          <MyButton className="new-user__buttons-reset" onClick={handleReset}>
            Reset
          </MyButton>
        </div>
      </form>
    </main>
  );
};

export default NewUser;
