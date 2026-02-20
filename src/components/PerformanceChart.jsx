import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const PerformanceChart = ({ subjectData }) => {
  const chartData = Object.entries(subjectData).map(([subject, avg]) => ({
    subject,
    average: parseFloat(avg)
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="subject" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="average" fill="#4f46e5" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PerformanceChart;