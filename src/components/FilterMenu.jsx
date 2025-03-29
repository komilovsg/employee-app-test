import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilters, setSorting } from "../redux/employeeSlice";
import "../styles/FilterMenu.scss";

const FilterMenu = () => {
  const dispatch = useDispatch();
  const [filters, setLocalFilters] = useState({
    role: "all",
    isArchive: false,
  });
  const [sorting, setLocalSorting] = useState({ field: null, order: "asc" });

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFilters = {
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    };
    setLocalFilters(newFilters);
    dispatch(setFilters(newFilters));
  };

  const handleSort = (field) => {
    const newOrder =
      sorting.field === field && sorting.order === "asc" ? "desc" : "asc";
    const newSorting = { field, order: newOrder };
    setLocalSorting(newSorting);
    dispatch(setSorting(newSorting));
  };

  return (
    <div className="filter-menu">
      <div className="filter-group">
        <select name="role" value={filters.role} onChange={handleFilterChange}>
          <option value="all">Все должности</option>
          <option value="cook">Повар</option>
          <option value="waiter">Официант</option>
          <option value="driver">Водитель</option>
        </select>
      </div>

      <div className="filter-group">
        <label>
          <input
            type="checkbox"
            name="isArchive"
            checked={filters.isArchive}
            onChange={handleFilterChange}
          />
          В архиве
        </label>
      </div>

      <div className="sort-buttons">
        <button
          className={sorting.field === "name" ? "active" : ""}
          onClick={() => handleSort("name")}
        >
          Сортировать по имени{" "}
          {sorting.field === "name" && (sorting.order === "asc" ? "↑" : "↓")}
        </button>
        <button
          className={sorting.field === "birthday" ? "active" : ""}
          onClick={() => handleSort("birthday")}
        >
          Сортировать по дате{" "}
          {sorting.field === "birthday" &&
            (sorting.order === "asc" ? "↑" : "↓")}
        </button>
      </div>
    </div>
  );
};

export default FilterMenu;
