import { useState } from "react";
import "../../css/EditUserForm.css";
import { useUpdateUserMutation } from "./usersApiSlice";
import MyButton from "../../components/myButton";
import type { User } from "./usersApiSlice";

type EditUserFormProps = {
  user: User;
};

const EditUserForm = ({ user }: EditUserFormProps) => {
  const [username, setUsername] = useState<string>(user.username);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const fetchedChecked = user.isAdmin ? true : false; // gets rid of warning in console about controlled/uncontrolled input
  const [isAdmin, setIsAdmin] = useState<boolean>(fetchedChecked);
  const [active, setActive] = useState<boolean>(user.active); // todo - change to user.isActive

  const [updateUser, { isSuccess, isLoading, error }] = useUpdateUserMutation();

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    await updateUser({
      id: user.id,
      username,
      password,
      isAdmin,
      active: active,
    });
    setPassword("");
    setConfirmPassword("");

    if (isSuccess) {
      alert("User has been updated successfully");
    } else if (error) {
      alert("Something went wrong");
    }
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setUsername(user.username);
    setPassword("");
    setConfirmPassword("");
    setIsAdmin(fetchedChecked);
    setActive(user.active);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setConfirmPassword(e.target.value);
  const handleAdminChange = () => setIsAdmin((prevIsAdmin) => !prevIsAdmin);
  const handleActiveChange = () => setActive((prevIsActive) => !prevIsActive);

  return (
    <main className="edit-user">
      <h1>Edit user</h1>
      <form action="" className="edit-user-form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <label htmlFor="confirm-password">Confirm password</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <div className="checkbox-div">
          <label htmlFor="admin" id="admin">
            Admin
          </label>
          <input
            type="checkbox"
            id="admin"
            checked={isAdmin}
            onChange={handleAdminChange}
          />
        </div>
        <div className="checkbox-div">
          <label htmlFor="active">Active</label>
          <input
            type="checkbox"
            id="active"
            checked={active}
            onChange={handleActiveChange}
          />
        </div>
        <div className="edit-user__buttons">
        <MyButton className="button" onClick={handleSubmit}>Submit</MyButton>
        <MyButton className="button danger-button" onClick={handleReset}>Reset</MyButton>
        </div>
      </form>
    </main>
  );
};

export default EditUserForm;
