import "../../css/Login.css";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="main-login">
      <div>
        <h1>Welcome!</h1>
      </div>
      <form action="" className="login-form">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <button className="login-btn" onClick={(e) => e.preventDefault()}>
          Login
        </button>
      </form>
    </main>
  );
};

export default Login;
