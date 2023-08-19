import { useSelector } from "react-redux";
import { selectUser } from "../auth/sessionSlice";
import "../../css/Admin.css";
import { useNavigate } from "react-router-dom";
import MyLink from "../../components/MyLink";

const Admin = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  if (!user) navigate("/login");

  if (!user?.isAdmin) {
    return (
      <div className="admin__not-admin">
        <p>
          <span className="text-red">You are not an admin</span>, in order to be
          one contact proper person
        </p>
      </div>
    );
  }

  return (
    <div className="admin">
      <h1>Admin panel</h1>
      <div className="admin__links">
        <MyLink className="admin__link" to="/admin/users">
          Users
        </MyLink>
        <MyLink className="admin__link" to="/admin/items">
          Items
        </MyLink>
      </div>
    </div>
  );
};

export default Admin;
