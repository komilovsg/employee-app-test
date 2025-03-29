import React, { useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setSearchQuery,
  setSortField,
  setSortDirection,
  setShowArchived,
  setCurrentPage,
  setRoleFilter,
} from "../redux/employeeSlice";
import { filterAndSortEmployees } from "../utils/filtering";
import EmployeeCard from "./EmployeeCard";
import "../styles/EmployeeList.scss";

const ITEMS_PER_PAGE = 12;

const ROLES = [
  { value: "", label: "Все должности" },
  { value: "cook", label: "Повар" },
  { value: "waiter", label: "Официант" },
  { value: "driver", label: "Водитель" },
];

const EmployeeList = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    employees,
    searchQuery,
    sortField,
    sortDirection,
    showArchived,
    currentPage,
    roleFilter,
  } = useSelector((state) => state.employees);

  const handleSearch = useCallback(
    (e) => {
      dispatch(setSearchQuery(e.target.value));
    },
    [dispatch]
  );

  const handleSort = useCallback(
    (field) => {
      if (sortField === field) {
        dispatch(setSortDirection(sortDirection === "asc" ? "desc" : "asc"));
      } else {
        dispatch(setSortField(field));
        dispatch(setSortDirection("asc"));
      }
    },
    [dispatch, sortField, sortDirection]
  );

  const handleShowArchived = useCallback(
    (e) => {
      dispatch(setShowArchived(e.target.checked));
    },
    [dispatch]
  );

  const handleRoleFilter = useCallback(
    (e) => {
      dispatch(setRoleFilter(e.target.value));
    },
    [dispatch]
  );

  const handleAddEmployee = useCallback(() => {
    navigate("/add");
  }, [navigate]);

  const filteredEmployees = useMemo(
    () =>
      filterAndSortEmployees(employees, {
        showArchived,
        searchQuery,
        sortField,
        sortDirection,
        roleFilter,
      }),
    [employees, showArchived, searchQuery, sortField, sortDirection, roleFilter]
  );

  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEmployees.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEmployees, currentPage]);

  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);

  return (
    <div className="employee-list">
      <div className="controls">
        <div className="search">
          <input
            type="text"
            placeholder="Поиск по имени"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="filters">
          <select value={roleFilter} onChange={handleRoleFilter}>
            {ROLES.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
          <label>
            <input
              type="checkbox"
              checked={showArchived}
              onChange={handleShowArchived}
            />
            В архиве
          </label>
        </div>
        <button onClick={handleAddEmployee} className="add-button">
          Добавить сотрудника
        </button>
      </div>

      <div className="sort-controls">
        <button
          className={sortField === "name" ? "active" : ""}
          onClick={() => handleSort("name")}
        >
          Имя
          {sortField === "name" && (
            <span className="sort-icon">
              {sortDirection === "asc" ? "↑" : "↓"}
            </span>
          )}
        </button>
        <button
          className={sortField === "birthday" ? "active" : ""}
          onClick={() => handleSort("birthday")}
        >
          Дата рождения
          {sortField === "birthday" && (
            <span className="sort-icon">
              {sortDirection === "asc" ? "↑" : "↓"}
            </span>
          )}
        </button>
      </div>

      <div className="cards-grid">
        {paginatedEmployees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => dispatch(setCurrentPage(page))}
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

EmployeeList.displayName = "EmployeeList";

export default EmployeeList;
