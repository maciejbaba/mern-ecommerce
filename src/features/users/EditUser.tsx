import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";
import "../../css/EditUser.css";
import EditUserForm from "./EditUserForm";

const EditUser = () => {
  const { id } = useParams();

  // fetch user, using selector resulted in an error due to attempting to access user.username before user was defined
  const { data: users } = useGetUsersQuery();

  let content;

  if (!id) {
    content = <p>Invalid user id</p>;
  }

  if (!users) {
    content = <p>No users found</p>;
  }

  if (users && users.entities && id) {
    const user = users.entities[id];

    // todo - add error handling, loading state from api instead of using this
    if (!user) {
      content = <p>Loading user data...</p>;
    }

    if (user) {
      content = <EditUserForm user={user} />;
    }
  }

  return <main className="edit-user">{content}</main>;
};

export default EditUser;
