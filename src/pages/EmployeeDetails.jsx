import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EmployeeDetails = () => {
  const { id } = useParams();
  const employee = useSelector((state) =>
    state.employees.find((emp) => emp.id === Number(id))
  );

  if (!employee) return <h2>Сотрудник не найден</h2>;

  return (
    <div>
      <h2>{employee.name}</h2>
      <p>Телефон: {employee.phone}</p>
      <p>Дата рождения: {employee.birthday}</p>
      <p>Должность: {employee.role}</p>
      <p>Статус: {employee.isArchive ? "В архивве" : "Активен"}</p>
    </div>
  );
};

export default EmployeeDetails;
