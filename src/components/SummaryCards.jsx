const SummaryCards = ({ overallAverage, totalStudents }) => {
  return (
    <div className="cards">
      <div className="card">
        <h3>Overall Average</h3>
        <p>{overallAverage}%</p>
      </div>
      <div className="card">
        <h3>Total Students</h3>
        <p>{totalStudents}</p>
      </div>
    </div>
  );
};

export default SummaryCards;