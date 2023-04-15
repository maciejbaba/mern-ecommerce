import User from "./User";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";

const UserPage = () => {
  const { id } = useParams();
  const user = useSelector(state => selectUserById(state, id));

  let content;

  if (!user) {
    content = <p>User not found</p>;
  }
  else if (user) {
    content = (
      <main style={{textAlign: "center"}}>
        <h1>User {user.username}</h1>
        <User id={id} />
      </main>
    );
  }

  return content;
};

export default UserPage;
