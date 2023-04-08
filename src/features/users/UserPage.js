import User from "./User";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";

const UserPage = () => {
  const { id } = useParams();
  const user = useSelector((state) => selectUserById(state, id));

  return (
    <main style={{ textAlign: "center" }}>
      <h1>User {user.username}</h1>
      <User id={id} />
    </main>
  );
};

export default UserPage;
