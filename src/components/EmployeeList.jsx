import React, { useCallback, Suspense, lazy } from "react";
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
import {
  selectSearchQuery,
  selectSortField,
  selectSortDirection,
  selectShowArchived,
  selectCurrentPage,
  selectRoleFilter,
  selectPaginatedEmployees,
  selectTotalPages,
} from "../redux/employeeSlice";
import LoadingSpinner from "./LoadingSpinner";
import "../styles/EmployeeList.scss";

const ITEMS_PER_PAGE = 12;

const ROLES = [
  { value: "", label: "Все должности" },
  { value: "cook", label: "Повар" },
  { value: "waiter", label: "Официант" },
  { value: "driver", label: "Водитель" },
];

// Ленивая загрузка компонента карточки
const EmployeeCard = lazy(() => import("./EmployeeCard"));

// Мемоизированный компонент для кнопки сортировки
const SortButton = React.memo(({ label, isActive, direction, onClick }) => (
  <button className={isActive ? "active" : ""} onClick={onClick}>
    {label}
    {isActive && (
      <span className="sort-icon">{direction === "asc" ? "↑" : "↓"}</span>
    )}
  </button>
));

SortButton.displayName = "SortButton";

// Мемоизированный компонент для пагинации
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const maxVisiblePages = 5;
  let visiblePages = pages;

  if (totalPages > maxVisiblePages) {
    const start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const end = Math.min(totalPages, start + maxVisiblePages - 1);
    visiblePages = pages.slice(start - 1, end);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ←
      </button>
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        →
      </button>
      <span className="page-info">
        Страница {currentPage} из {totalPages}
      </span>
    </div>
  );
};

Pagination.displayName = "Pagination";

const EmployeeList = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Используем мемоизированные селекторы
  const searchQuery = useSelector(selectSearchQuery);
  const sortField = useSelector(selectSortField);
  const sortDirection = useSelector(selectSortDirection);
  const showArchived = useSelector(selectShowArchived);
  const currentPage = useSelector(selectCurrentPage);
  const roleFilter = useSelector(selectRoleFilter);
  const paginatedEmployees = useSelector(selectPaginatedEmployees);
  const totalPages = useSelector(selectTotalPages);

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

  const handlePageChange = useCallback(
    (page) => {
      dispatch(setCurrentPage(page));
    },
    [dispatch]
  );

  const handleAddEmployee = useCallback(() => {
    navigate("/add", { replace: true });
  }, [navigate]);

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
          <button onClick={handleAddEmployee} className="add-button">
            Добавить сотрудника
          </button>
        </div>
      </div>

      <div className="sort-controls">
        <SortButton
          label="Имя"
          isActive={sortField === "name"}
          direction={sortDirection}
          onClick={() => handleSort("name")}
        />
        <SortButton
          label="Дата рождения"
          isActive={sortField === "birthday"}
          direction={sortDirection}
          onClick={() => handleSort("birthday")}
        />
      </div>

      <div className="cards-grid">
        <Suspense fallback={<LoadingSpinner />}>
          {paginatedEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </Suspense>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
});

EmployeeList.displayName = "EmployeeList";

export default EmployeeList;
