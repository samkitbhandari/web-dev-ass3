import facultyData from "../data/facultyData";

const FilterPanel = ({ setSelectedFaculty }) => {
  const facultyNames = Object.keys(facultyData);

  return (
    <div className="filter-panel">
      <select onChange={e => setSelectedFaculty(e.target.value)}>
        <option value="">Select Faculty</option>
        {facultyNames.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterPanel;