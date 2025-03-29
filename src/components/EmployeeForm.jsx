import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../redux/employeeSlice";

const EmployeeForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [role, setRole] = useState("driver");

  const handleSubmit = () => {
    dispatch(
      addEmployee({
        id: Date.now(),
        name,
        phone,
        birthday,
        role,
        isArchive: false,
      })
    );
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Имя"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Телефон"
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="data"
        placeholder="Телефон"
        onChange={(e) => setBirthday(e.target.value)}
      />
      <input type="chackbox" onChange={(e) => setRole(e.target.value)} />
      <button onClick={handleSubmit}>Добавить</button>
    </div>
  );
};

export default EmployeeForm;
