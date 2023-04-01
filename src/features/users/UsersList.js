import "../../css/UsersList.css";
import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";

const UsersList = () => {
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
          <h1>Other users</h1>
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

  return content;
};

export default UsersList;
