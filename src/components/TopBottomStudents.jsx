const StudentTable = ({ title, students }) => {
  return (
    <div className="table-container">
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.rollNo}</td>
              <td>{student.name}</td>
              <td>{student.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;