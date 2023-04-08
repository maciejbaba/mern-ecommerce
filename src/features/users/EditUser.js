import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import "../../css/EditUser.css";
import EditUserForm from "./EditUserForm";

const EditUser = () => {
  const { id } = useParams();

  // fetch user, using selector resulted in an error due to attempting to access user.username before user was defined
  const { user } = useGetUsersQuery("getUser", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  let content;

  if (!user) {
    content = <p>Loading user data...</p>;
  }

  if (user) {
    content = <EditUserForm user={user} />;
  }

  return <main className="edit-user-main">{content}</main>;
};

export default EditUser;
