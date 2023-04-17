import "../../css/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <main className="login">
      <div>
        <h1>Welcome!</h1>
      </div>
      <form action="" className="login__form">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.currentTarget.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.currentTarget.value)}
        />
        <button className="login__login-button" onChange={e => e.preventDefault()}>
          Login
        </button>
      </form>

      <div>
        <p>
          Don't have an account?{" "}
          <button onClick={handleRegister} style={{ padding: ".2rem" }}>
            Register
          </button>
        </p>
      </div>
    </main>
  );
};

export default Login;
