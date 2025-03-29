import { useDispatch, useSelector } from "react-redux";
import { setSorting } from "../redux/employeeSlice";

const EmployeeSort = () => {
  const dispatch = useDispatch();
  const sorting = useSelector((state) => state.employees.sorting);

  const handleFieldChange = (e) => {
    dispatch(setSorting({ ...sorting, field: e.target.value }));
  };

  const toggleOrder = () => {
    dispatch(
      setSorting({
        ...sorting,
        order: sorting.order === "asc" ? "desc" : "asc",
      })
    );
  };

  return (
    <div className="employee-sort">
      <select value={sorting.field} onChange={handleFieldChange}>
        <option value="name">Имя</option>
        <option value="role">Роль</option>
      </select>
      <button onClick={toggleOrder}>
        {sorting.order === "asc" ? "⬆️ По возрастанию" : "⬇️ По убыванию"}
      </button>
    </div>
  );
};

export default EmployeeSort;
