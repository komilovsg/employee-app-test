import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEmployeeAsync } from "../redux/employeeSlice";
import toast from "react-hot-toast";
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
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно для заполнения";
    } else if (formData.name.length < 2) {
      newErrors.name = "Имя должно содержать минимум 2 символа";
    }

    if (!formData.role) {
      newErrors.role = "Выберите должность";
    }

    if (!formData.phone) {
      newErrors.phone = "Введите номер телефона";
    } else {
      const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Неверный формат номера телефона";
      }
    }

    if (!formData.birthday) {
      newErrors.birthday = "Введите дату рождения";
    } else {
      const birthdayDate = new Date(formData.birthday);
      const today = new Date();
      if (birthdayDate > today) {
        newErrors.birthday = "Дата рождения не может быть в будущем";
      }
      if (today.getFullYear() - birthdayDate.getFullYear() < 18) {
        newErrors.birthday = "Сотрудник должен быть старше 18 лет";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    let formattedValue = "";

    if (value.length > 0) {
      formattedValue = "+7 (";
      if (value.length <= 3) {
        formattedValue += value;
      } else if (value.length <= 6) {
        formattedValue += `${value.slice(0, 3)}) ${value.slice(3)}`;
      } else if (value.length <= 8) {
        formattedValue += `${value.slice(0, 3)}) ${value.slice(
          3,
          6
        )}-${value.slice(6)}`;
      } else {
        formattedValue += `${value.slice(0, 3)}) ${value.slice(
          3,
          6
        )}-${value.slice(6, 8)}-${value.slice(8, 10)}`;
      }
    }

    setFormData((prev) => ({ ...prev, phone: formattedValue }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Пожалуйста, исправьте ошибки в форме");
      return;
    }

    setIsLoading(true);
    try {
      const [year, month, day] = formData.birthday.split("-");
      const formattedBirthday = `${day}.${month}.${year}`;

      const newEmployee = {
        ...formData,
        id: Date.now(),
        birthday: formattedBirthday,
      };

      await dispatch(addEmployeeAsync(newEmployee)).unwrap();
      toast.success("Сотрудник успешно добавлен");
      navigate("/");
    } catch (err) {
      console.error("Error adding employee:", err);
      toast.error("Произошла ошибка при добавлении сотрудника");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="employee-edit">
      <h2>Добавление сотрудника</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">ФИО:</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className={errors.name ? "error" : ""}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="role">Должность:</label>
          <select
            id="role"
            value={formData.role}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, role: e.target.value }))
            }
            className={errors.role ? "error" : ""}
          >
            <option value="">Выберите должность</option>
            <option value="cook">Повар</option>
            <option value="waiter">Официант</option>
            <option value="driver">Водитель</option>
          </select>
          {errors.role && <span className="error-message">{errors.role}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Телефон:</label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="+7 (XXX) XXX-XX-XX"
            className={errors.phone ? "error" : ""}
          />
          {errors.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="birthday">Дата рождения:</label>
          <input
            type="date"
            id="birthday"
            value={formData.birthday}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, birthday: e.target.value }))
            }
            className={errors.birthday ? "error" : ""}
          />
          {errors.birthday && (
            <span className="error-message">{errors.birthday}</span>
          )}
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={formData.isArchive}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isArchive: e.target.checked,
                }))
              }
            />
            В архиве
          </label>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate("/")}>
            Отмена
          </button>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Добавление..." : "Добавить"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeAdd;
