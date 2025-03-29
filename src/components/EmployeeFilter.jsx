import { useDispatch } from "react-redux";
import { setFilters } from "../redux/employeesSlice";
import { useState } from "react";
import "../styles/EmployeeFilter.scss";

const EmployeeFilter = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleFilterChange = () => {
    dispatch(setFilters({ name, role }));
  };

  return (
    <div className="employee-filter">
      <input
        type="text"
        placeholder="Имя сотрудника"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Должность"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <button onClick={handleFilterChange}>Применить фильтр</button>
    </div>
  );
};

export default EmployeeFilter;
