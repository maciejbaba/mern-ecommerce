import "../../css/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../app/api/apiSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  const handleUsernameChange = e => {
    setUsername(e.currentTarget.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.currentTarget.value);
  };

  const handleLogin = e => {
    e.preventDefault();
    fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then(res => {
        return res.json();
      })
      .then(({ accessToken }) => {
        if (accessToken) {
          localStorage.setItem("token", accessToken);
          alert("Login successful");
          navigate("/");
        }
        else {
          alert("Invalid username or password");
        }
      });
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
          onChange={handleUsernameChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className="login__login-button" onClick={handleLogin}>
          Login
        </button>
      </form>

      <div>
        <p>
          Don't have an account?{" "}
          <button className="login__register-button" onClick={handleRegister}>
            Register
          </button>
        </p>
      </div>
    </main>
  );
};

export default Login;
