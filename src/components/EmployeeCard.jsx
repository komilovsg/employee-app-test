import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateEmployeeAsync,
  deleteEmployeeAsync,
} from "../redux/employeeSlice";
import toast from "react-hot-toast";
import "../styles/EmployeeCard.scss";

const EmployeeCard = ({ employee }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    if (
      !e.target.closest(".archive-button") &&
      !e.target.closest(".delete-button")
    ) {
      navigate(`/edit/${employee.id}`);
    }
  };

  const handleArchive = async (e) => {
    e.stopPropagation();
    try {
      const updatedEmployee = {
        ...employee,
        isArchive: !employee.isArchive,
      };
      await dispatch(updateEmployeeAsync(updatedEmployee)).unwrap();
      const action = employee.isArchive ? "восстановлен" : "архивирован";
      toast.success(`Сотрудник успешно ${action}`);
    } catch (err) {
      console.error("Error updating employee:", err);
      toast.error("Произошла ошибка при изменении статуса сотрудника");
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (
      window.confirm(
        "Вы уверены, что хотите удалить этого сотрудника? Это действие нельзя отменить."
      )
    ) {
      try {
        await dispatch(deleteEmployeeAsync(employee.id)).unwrap();
        toast.success("Сотрудник успешно удален");
      } catch (err) {
        console.error("Error deleting employee:", err);
        toast.error("Произошла ошибка при удалении сотрудника");
      }
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
        <button
          className="archive-button"
          onClick={handleArchive}
          title={employee.isArchive ? "Восстановить" : "Архивировать"}
        >
          {employee.isArchive ? "Восстановить" : "Архивировать"}
        </button>
        <button
          className="delete-button"
          onClick={handleDelete}
          title="Удалить сотрудника"
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
