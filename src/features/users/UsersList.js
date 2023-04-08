import "../../css/UsersList.css";
import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate("/users/newUser");
  };

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content = <div></div>;

  if (isLoading) {
    content = (
      <div>
        <p>Loading users...</p>
      </div>
    );
  } else if (isSuccess) {
    content = (
      <main>
        <div>
          <h1>Users</h1>
        </div>
        <div className="users-list">
          {users.ids.map((userId) => (
            <User key={userId} id={userId} />
          ))}
        </div>
      </main>
    );
  } else if (isError) {
    content = (
      <div>
        <p>Snap! ERROR</p>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <button className="users-list__add-user-button" onClick={handleAddUser}>Add user</button>
      <div className="content">{content}</div>
    </>
  );
};

export default UsersList;
