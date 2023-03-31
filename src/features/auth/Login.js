import "../../css/Login.css"

const Login = () => {
  return (
    <main className="main-login">
      <div>
        <h1>Login</h1>
      </div>
      <form action="" className="login-form">
        <label htmlFor="username">Username: </label>
        <input type="text" />
        <label htmlFor="password">Password: </label>
        <input type="password" />
      </form>
    </main>
  )
}

export default Login