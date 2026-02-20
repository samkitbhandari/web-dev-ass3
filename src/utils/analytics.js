export const calculateOverallAverage = (data) => {
  if (data.length === 0) return 0;

  const totalMarks = data.flatMap(student =>
    Object.values(student.subjects)
  );

  return (
    totalMarks.reduce((a, b) => a + b, 0) /
    totalMarks.length
  ).toFixed(2);
};

export const getSubjectAverages = (data) => {
  if (data.length === 0) return {};

  const subjectTotals = {};
  const count = data.length;

  data.forEach(student => {
    Object.entries(student.subjects).forEach(([subject, marks]) => {
      subjectTotals[subject] = (subjectTotals[subject] || 0) + marks;
    });
  });

  return Object.fromEntries(
    Object.entries(subjectTotals).map(([subject, total]) => [
      subject,
      (total / count).toFixed(2)
    ])
  );
};

export const getGradeDistribution = (data) => {
  const grades = { A: 0, B: 0, C: 0, F: 0 };

  data.forEach(student => {
    const avg =
      Object.values(student.subjects).reduce((a, b) => a + b, 0) /
      Object.keys(student.subjects).length;

    if (avg >= 75) grades.A++;
    else if (avg >= 60) grades.B++;
    else if (avg >= 40) grades.C++;
    else grades.F++;
  });

  return grades;
};

export const getPassPercentage = (data) => {
  if (data.length === 0) return 0;

  const passed = data.filter(student =>
    Object.values(student.subjects).every(mark => mark >= 40)
  );

  return ((passed.length / data.length) * 100).toFixed(2);
};

export const getTopBottomFive = (data) => {
  if (data.length === 0) return { topFive: [], bottomFive: [] };

  const totals = data.map(student => ({
    ...student,
    total: Object.values(student.subjects)
      .reduce((a, b) => a + b, 0)
  }));

  totals.sort((a, b) => b.total - a.total);

  return {
    topFive: totals.slice(0, 5),
    bottomFive: totals.slice(-5)
  };
};

/* 🔥 AI-Based Weak Subject Detection */
export const detectWeakSubjects = (data) => {
  if (data.length === 0) return [];

  const subjectStats = {};
  const studentCount = data.length;

  data.forEach(student => {
    Object.entries(student.subjects).forEach(([subject, marks]) => {
      if (!subjectStats[subject]) {
        subjectStats[subject] = { total: 0, fail: 0 };
      }

      subjectStats[subject].total += marks;
      if (marks < 40) subjectStats[subject].fail++;
    });
  });

  const result = [];

  Object.entries(subjectStats).forEach(([subject, stats]) => {
    const avg = stats.total / studentCount;
    const failRate = (stats.fail / studentCount) * 100;

    if (avg < 60 || failRate > 30) {
      result.push({
        subject,
        average: avg.toFixed(2),
        failRate: failRate.toFixed(2)
      });
    }
  });

  return result;
};