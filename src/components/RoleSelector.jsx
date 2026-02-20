const RoleSelector = ({ setRole }) => {
  return (
    <div className="role-selector">
      <h2>Select Role</h2>
      <button onClick={() => setRole("faculty")}>Faculty</button>
      <button onClick={() => setRole("hod")}>HOD</button>
      <button onClick={() => setRole("student")}>Student</button>
    </div>
  );
};

export default RoleSelector;