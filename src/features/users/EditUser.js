import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUserById } from "./usersApiSlice"

const EditUser = () => {
  return (
    <main>
      <h1>Edit user</h1>
      <form action="">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <label htmlFor="confirm-password">Confirm password</label>
        <input type="password" id="confirm-password" />
        <label htmlFor="admin" id="admin"></label>
        <input type="checkbox" id="admin" />

        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </form>
    </main>
  )
}

export default EditUser