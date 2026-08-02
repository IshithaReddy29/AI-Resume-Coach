function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="navbar">
      <h1>Dashboard</h1>

      <div>👋 {user?.name}</div>
    </div>
  );
}

export default Navbar;