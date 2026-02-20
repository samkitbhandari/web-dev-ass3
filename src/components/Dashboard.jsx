import data from "./data/results.json";
import {
  calculateOverallAverage,
  getSubjectAverages,
  getTopAndBottomStudents
} from "./utils/analytics";

import SummaryCards from "./components/SummaryCards";
import PerformanceChart from "./components/PerformanceChart";

function App() {
  const overallAverage = calculateOverallAverage(data);
  const subjectAverages = getSubjectAverages(data);
  const { top, bottom } = getTopAndBottomStudents(data);

  return (
    <div className="dashboard">
      <h1>Class Performance Dashboard</h1>

      <SummaryCards
        overallAverage={overallAverage}
        totalStudents={data.length}
      />

      <PerformanceChart subjectData={subjectAverages} />

      <h2>🏆 Top Performer: {top.name}</h2>
      <h2>⚠️ Needs Improvement: {bottom.name}</h2>
    </div>
  );
}

export default App;