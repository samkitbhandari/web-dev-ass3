import { useState } from "react";
import data from "./data/results.json";
import facultyData from "./data/facultyData";

import {
  calculateOverallAverage,
  getSubjectAverages,
  getGradeDistribution,
  getPassPercentage,
  getTopBottomFive,
  detectWeakSubjects
} from "./utils/analytics";

import SummaryCards from "./components/SummaryCards";
import PerformanceChart from "./components/PerformanceChart";
import DistributionChart from "./components/DistributionChart";
import StudentTable from "./components/TopBottomStudents";
import FilterPanel from "./components/FilterPanel";
import RoleSelector from "./components/RoleSelector";

import "./App.css";

function App() {
  const [role, setRole] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState("");

  if (!role) {
    return <RoleSelector setRole={setRole} />;
  }

  // Get full subject averages
  const subjectAverages = getSubjectAverages(data);

  // Filter subjects if faculty selected
  const filteredSubjectAverages = selectedFaculty
    ? Object.fromEntries(
        Object.entries(subjectAverages).filter(([subject]) =>
          facultyData[selectedFaculty].includes(subject)
        )
      )
    : subjectAverages;

  const overallAverage = calculateOverallAverage(data);
  const gradeDistribution = getGradeDistribution(data);
  const passPercentage = getPassPercentage(data);
  const { topFive, bottomFive } = getTopBottomFive(data);
  const weakSubjects = detectWeakSubjects(data);

  return (
    <div className="dashboard">
      <h1>📊 PRJ3 Performance Dashboard</h1>
      <h3>Role: {role.toUpperCase()}</h3>

      {role === "faculty" && (
        <FilterPanel setSelectedFaculty={setSelectedFaculty} />
      )}

      <SummaryCards
        overallAverage={overallAverage}
        totalStudents={data.length}
      />

      <PerformanceChart subjectData={filteredSubjectAverages} />
      <DistributionChart gradeDistribution={gradeDistribution} />

      <h2>Pass Percentage: {passPercentage}%</h2>

      {role === "hod" && (
        <div>
          <h2>⚠ Weak Subjects (AI Detection)</h2>
          {weakSubjects.length === 0
            ? "No critical weaknesses detected."
            : weakSubjects.map((sub, index) => (
                <p key={index}>
                  {sub.subject} — Avg: {sub.average} | Fail Rate: {sub.failRate}%
                </p>
              ))}
        </div>
      )}

      {(role === "faculty" || role === "hod") && (
        <div className="tables">
          <StudentTable title="Top 5 Students" students={topFive} />
          <StudentTable title="Bottom 5 Students" students={bottomFive} />
        </div>
      )}
    </div>
  );
}

export default App;