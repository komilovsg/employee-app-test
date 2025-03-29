import { useDispatch, useSelector } from "react-redux";
import { setSorting } from "../redux/employeeSlice";
import "../styles/EmployeeSorting.scss";

const EmployeeSorting = () => {
  const dispatch = useDispatch();
  const sorting = useSelector((state) => state.employees.sorting);

  const handleChange = (event) => {
    dispatch(setSorting(event.target.value));
  };

  return (
    <div className="employee-sorting">
      <label>Сортировка:</label>
      <select value={sorting} onChange={handleChange}>
        <option value="asc">По имени (A-Z)</option>
        <option value="desc">По имени (Z-A)</option>
      </select>
    </div>
  );
};

export default EmployeeSorting;
