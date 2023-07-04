const Admin = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div>
        Not logged in, in order to see the admin panel you have to be logged in
        and be an admin
      </div>
    );
  }

  console.log(token);

  return <div>Admin</div>;
};

export default Admin;
