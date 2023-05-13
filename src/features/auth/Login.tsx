import "../../css/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../app/api/apiSlice";
import MyButton from "../../components/myButton";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        return res.json();
      })
      .then(({ accessToken }) => {
        if (accessToken) {
          localStorage.setItem("token", accessToken);
          alert("Login successful");
          navigate("/");
          window.location.reload();
        } else {
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
        <MyButton className="login__login-button" onClick={handleLogin}>
          Login
        </MyButton>
      </form>

      <div>
        <p>
          Don't have an account?{" "}
          <MyButton className="login__register-button" onClick={handleRegister}>
            Register
          </MyButton>
        </p>
      </div>
    </main>
  );
};

export default Login;
