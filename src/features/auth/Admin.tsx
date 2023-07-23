import { useSelector } from "react-redux";
import { selectUser } from "../auth/sessionSlice";
import "../../css/Admin.css";
import { useNavigate } from "react-router-dom";
import MyButton from "../../components/myButton";

const Admin = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="admin__not-logged">
        <p>
          <span className="text-red">Not logged in</span>, in order to see the
          admin panel <span className="text-red">you have to be logged in</span>{" "}
          and be <span className="text-red">an admin</span>
        </p>
        <MyButton className="button" onClick={handleLoginClick}>
          Login
        </MyButton>
      </div>
    );
  }

  if (!user.isAdmin) {
    return (
      <div className="admin__not-admin">
        <p>
          <span className="text-red">You are not an admin</span>, in order to be
          one contact proper person
        </p>
      </div>
    );
  }

  return <div className="admin">Admin panel</div>;
};

export default Admin;
