import User from "./User";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import { RootState } from "../../app/store";

const UserPage = (): JSX.Element => {
  const { id } = useParams();

  let content = <p>Loading user...</p>; // basic JSX.Element otherwise TS complains

  if (!id) {
    content = <p>Invalid user ID</p>;
  }

  if (id) {
    const user = useSelector((state: RootState) => selectUserById(state, id)); // has to be here because of possible undefined id

    if (!user) {
      content = <p>User not found</p>;
    } else if (user) {
      content = (
        <main style={{ textAlign: "center" }}>
          <h1>User {user.username}</h1>
          <User id={id} />
        </main>
      );
    }
  }

  return content;
};

export default UserPage;
