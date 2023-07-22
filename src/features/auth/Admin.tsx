import { useSelector } from "react-redux"
import { selectUser } from "../auth/sessionSlice"

const Admin = () => {
  const user = useSelector(selectUser);
  console.log(user);
  
  
  if (!user) {
    return (
      <div>
        Not logged in, in order to see the admin panel you have to be logged in
        and be an admin
      </div>
    );
  }

  if (!user.isAdmin) {
    return <div>You are not an admin</div>;
  }

  return <div>Admin panel</div>;
};

export default Admin;
