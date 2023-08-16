import "../../css/UsersList.css";
import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MyButton from "../../components/MyButton";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  const navigate = useNavigate();

  let content;

  if (isLoading) {
    content = <p>Loading users...</p>;
  } else if (isSuccess) {
    content = (
      <main>
        <div>
          <h1>Users</h1>
        </div>
        <div style={{ margin: "1rem" }}>
          <MyButton className="button" onClick={() => navigate("/users/new")}>
            Add User
          </MyButton>
        </div>
        <div className="users-list__links-list">
          {users.ids.map((userId) => (
            <Link to={`/admin/users/${userId}`} key={userId}>
              <User id={userId} />
            </Link>
          ))}
        </div>
      </main>
    );
  } else if (isError && "data" in error) {
    content = (
      <div>
        <p>Snap! ERROR</p>
        <p>
          {error.status} {JSON.stringify(error)}
        </p>
      </div>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return <div className="users-list">{content}</div>;
};

export default UsersList;
