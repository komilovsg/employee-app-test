import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateEmployee, toggleArchive } from "../redux/employeeSlice";
import "../styles/EmployeeCard.scss";

const EmployeeCard = ({ employee }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Предотвращаем переход к редактированию при клике на кнопки
    if (e.target.closest(".employee-actions")) {
      return;
    }
    navigate(`/edit/${employee.id}`);
  };

  const handleArchive = (e) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    dispatch(toggleArchive(employee.id));
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    if (window.confirm("Вы уверены, что хотите удалить этого сотрудника?")) {
      dispatch(updateEmployee({ ...employee, isDeleted: true }));
    }
  };

  const getRoleName = (role) => {
    const roles = {
      cook: "Повар",
      waiter: "Официант",
      driver: "Водитель",
    };
    return roles[role] || role;
  };

  return (
    <div
      className={`employee-card ${employee.isArchive ? "archived" : ""}`}
      onClick={handleCardClick}
    >
      {employee.isArchive && <div className="archive-indicator">Архив</div>}
      <div className="employee-info">
        <h3>{employee.name}</h3>
        <p>Должность: {getRoleName(employee.role)}</p>
        <p>Телефон: {employee.phone}</p>
      </div>
      <div className="employee-actions">
        <button className="archive" onClick={handleArchive}>
          {employee.isArchive ? "Восстановить" : "В архив"}
        </button>
        <button className="delete" onClick={handleDelete}>
          Удалить
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
