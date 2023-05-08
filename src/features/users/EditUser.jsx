import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";
import "../../css/EditUser.css";
import EditUserForm from "./EditUserForm";

const EditUser = () => {
  const { id } = useParams();

  // fetch user, using selector resulted in an error due to attempting to access user.username before user was defined
  const { data: users } = useGetUsersQuery();
  const user = users?.entities[id];

  let content;

  // todo - add error handling, loading state from api instead of using this
  if (!user) {
    content = <p>Loading user data...</p>;
  }

  if (user) {
    content = <EditUserForm user={user} />;
  }

  return <main className="edit-user">{content}</main>;
};

export default EditUser;
