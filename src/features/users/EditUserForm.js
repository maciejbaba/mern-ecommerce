import { useState } from "react";
import "../../css/EditUserForm.css";

const EditUserForm = ({ user }) => {

  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
   }

  const handleUsernameChange = e => setUsername(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);
  const handleConfirmPasswordChange = e => setConfirmPassword(e.target.value);
  const handleAdminChange = e => setIsAdmin(!isAdmin);


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
          <input type="password" id="password" />
          <label htmlFor="confirm-password">Confirm password</label>
          <input type="password" id="confirm-password" />
          <label htmlFor="admin" id="admin">
            Admin
          </label>
          <input type="checkbox" id="admin" />

          <button onClick={handleSubmit}>Submit</button>
          <button type="reset">Reset</button>
        </form>
      </main>
  )
}

export default EditUserForm