import { useState } from "react";
import "../../css/EditUserForm.css";
import { useUpdateUserMutation } from "./usersApiSlice";

const EditUserForm = ({ user }) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const fetchedChecked = user.isAdmin ? true : false; // gets rid of warning in console about controlled/uncontrolled input
  const [isAdmin, setIsAdmin] = useState(fetchedChecked);
  const [active, setActive] = useState(user.active); // todo - change to user.isActive

  const [updateUser, { isSuccess, isLoading, error }] = useUpdateUserMutation(); // add error handling here

  const handleSubmit = async (e) => {
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
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setUsername(user.username);
    setPassword("");
    setConfirmPassword("");
    setIsAdmin(fetchedChecked);
    setActive(user.active);
  };

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handleAdminChange = () => setIsAdmin((prevIsAdmin) => !prevIsAdmin);
  const handleActiveChange = () => setActive((prevIsActive) => !prevIsActive);

  return (
    <main>
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
        <div>
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
        <div>
          <label htmlFor="active">Active</label>
          <input
            type="checkbox"
            id="active"
            checked={active}
            onChange={handleActiveChange}
          />
        </div>
        <MyButton onClick={handleSubmit}>Submit</MyButton>
        <MyButton onClick={handleReset}>Reset</MyButton>
      </form>
    </main>
  );
};

export default EditUserForm;
