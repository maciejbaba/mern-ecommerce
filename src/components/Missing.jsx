import "../css/Missing.css";
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <main className="missing">
      <h1>Opss</h1>
      <p>The page you have requested doesn't exist</p>
      <Link className="missing__link" to="/">
        Visit homepage
      </Link>
    </main>
  );
};

export default Missing;
