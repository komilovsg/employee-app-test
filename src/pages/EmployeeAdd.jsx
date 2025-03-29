import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEmployee } from "../redux/employeeSlice";
import "../styles/EmployeeEdit.scss";

const EmployeeAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    birthday: "",
    role: "",
    isArchive: false,
  });
  const [errors, setErrors] = useState({});

  const convertDateForStorage = (dateString) => {
    if (!dateString) return "";
    try {
      const [year, month, day] = dateString.split("-");
      return `${day}.${month}.${year}`;
    } catch {
      return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно для заполнения";
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!phoneDigits) {
      newErrors.phone = "Номер телефона обязателен для заполнения";
    } else if (phoneDigits.length !== 11) {
      newErrors.phone = "Номер телефона должен содержать 11 цифр";
    } else if (phoneDigits[1] === "0") {
      newErrors.phone = "Номер не может начинаться с 0 после кода страны";
    }

    if (!formData.birthday) {
      newErrors.birthday = "Дата рождения обязательна для заполнения";
    }
    if (!formData.role) {
      newErrors.role = "Должность обязательна для заполнения";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    const digits = value.replace(/\D/g, "");
    const truncatedDigits = digits.substring(0, 11);
    let formattedValue = "";
    if (truncatedDigits.length > 0) {
      formattedValue = "+7";
      if (truncatedDigits.length > 1) {
        formattedValue += ` (${truncatedDigits.substring(1, 4)}`;
      }
      if (truncatedDigits.length > 4) {
        formattedValue += `) ${truncatedDigits.substring(4, 7)}`;
      }
      if (truncatedDigits.length > 7) {
        formattedValue += `-${truncatedDigits.substring(7, 9)}`;
      }
      if (truncatedDigits.length > 9) {
        formattedValue += `-${truncatedDigits.substring(9, 11)}`;
      }
    }
    setFormData({
      ...formData,
      phone: formattedValue,
    });
    if (errors.phone) {
      setErrors({ ...errors, phone: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newEmployee = {
        ...formData,
        id: Date.now(),
        birthday: convertDateForStorage(formData.birthday),
      };
      dispatch(addEmployee(newEmployee));
      navigate("/");
    }
  };

  return (
    <div className="employee-edit">
      <h2>Добавление сотрудника</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Имя:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error" : ""}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label>Телефон:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            className={errors.phone ? "error" : ""}
            placeholder="+7 (___) ___-__-__"
            maxLength="18"
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>

        <div className="form-group">
          <label>Дата рождения:</label>
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            className={errors.birthday ? "error" : ""}
          />
          {errors.birthday && (
            <div className="error-message">{errors.birthday}</div>
          )}
        </div>

        <div className="form-group">
          <label>Должность:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={errors.role ? "error" : ""}
          >
            <option value="">Выберите должность</option>
            <option value="cook">Повар</option>
            <option value="waiter">Официант</option>
            <option value="driver">Водитель</option>
          </select>
          {errors.role && <div className="error-message">{errors.role}</div>}
        </div>

        <div className="form-group">
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="isArchive"
              checked={formData.isArchive}
              onChange={handleChange}
            />
            <label>В архиве</label>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel"
            onClick={() => navigate("/")}
          >
            Отмена
          </button>
          <button type="submit">Добавить</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeAdd;
