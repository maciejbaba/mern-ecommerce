import "../../css/Login.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { baseUrl } from "../../app/api/apiSlice";
import MyButton from "../../components/MyButton";
import { useDispatch } from "react-redux";
import { setSession } from "./sessionSlice";
import type { User } from "../users/usersApiSlice";

const blackText = {
  color: "green",
};

const loginRequest = async (username: string, password: string) => {
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!username) {
      alert("Username is required");
      return;
    } // change this two later to more user friendly
    if (!password) {
      alert("Password is required");
      return;
    }
    loginRequest(username, password).then((data) => {
      if (data) {
        const token: string = data.accessToken;
        const user: User = data.user;
        if (!user) {
          alert("no user");
          return;
        }
        if (!token) {
          alert("no token");
          return;
        }
        dispatch(setSession({ user, token }));
        location.pathname === "/login"
          ? navigate("/")
          : navigate(location.pathname);
      } else {
        alert("Wrong username or password");
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
          autoComplete="username"
          value={username}
          onChange={({ currentTarget }) => setUsername(currentTarget.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={({ currentTarget }) => setPassword(currentTarget.value)}
        />
        <MyButton className="login__login-button" onClick={handleLogin}>
          Login
        </MyButton>
      </form>

      <div>
        <p>
          Don't have an account?{" "}
          <MyButton
            className="login__register-button"
            onClick={() => navigate("/register")}
          >
            Register
          </MyButton>
        </p>
      </div>
      <div className="login__hint">
        <p>
          <strong>For admin access</strong>
        </p>
        <p>
          username <strong style={blackText}>admin</strong>
        </p>
        <p>
          password <strong style={blackText}>admin</strong>
        </p>
        <p>
          <strong>For normal user</strong>
        </p>
        <p>
          username <strong style={blackText}>user</strong>
        </p>
        <p>
          password <strong style={blackText}>user</strong>
        </p>
      </div>
    </main>
  );
};

export default Login;
