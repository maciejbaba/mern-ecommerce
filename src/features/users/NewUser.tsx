import { useState } from "react";
import "../../css/NewUser.css";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import MyButton from "../../components/myButton";

const NewUser = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

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
      navigate("/users");
    } else if (isError) {
      alert("Something went wrong");
    }
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
            value={isAdmin ? "true" : "false"}
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
