import "../../css/UsersList.css";
import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import { useNavigate, Link } from "react-router-dom";
import MyButton from "../../components/myButton";
import { EntityId } from "@reduxjs/toolkit";

const UsersList = () => {
  const navigate = useNavigate();

  const handleAddUser = () => navigate("/users/newUser");

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content;

  if (isLoading) {
    content = <p>Loading users...</p>;
  } else if (isSuccess) {
    content = (
      <main>
        <div>
          <h1>Users</h1>
        </div>
        <div className="users-list__links-list">
          {users.ids.map((userId) => (
            <Link to={`/users/${userId}`} key={userId}>
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

  return (
    <>
      <MyButton className="users-list__add-user-button" onClick={handleAddUser}>
        Add user
      </MyButton>
      <div className="users-list">{content}</div>
    </>
  );
};

export default UsersList;
