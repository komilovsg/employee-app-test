import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployeeAsync } from "../redux/employeeSlice";
import toast from "react-hot-toast";
import "../styles/EmployeeEdit.scss";

const EmployeeEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employee = useSelector((state) =>
    state.employees.employees.find((emp) => emp.id === parseInt(id))
  );

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    birthday: "",
    role: "",
    isArchive: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (employee) {
      const [day, month, year] = employee.birthday.split(".");
      const formattedDate = `${year}-${month}-${day}`;
      setFormData({
        ...employee,
        birthday: formattedDate,
      });
    }
  }, [employee]);

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
    let value = e.target.value.replace(/\D/g, "");

    if (value.startsWith("7") || value.startsWith("8")) {
      value = value.slice(1);
    }
    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handlePhoneBlur = () => {
    let value = formData.phone;
    if (!value) return;

    let formattedValue = "+7 ";
    if (value.length > 0) {
      formattedValue += `(${value.slice(0, 3)}`;
    }
    if (value.length > 3) {
      formattedValue += `) ${value.slice(3, 6)}`;
    }
    if (value.length > 6) {
      formattedValue += `-${value.slice(6, 8)}`;
    }
    if (value.length > 8) {
      formattedValue += `-${value.slice(8, 10)}`;
    }

    setFormData((prev) => ({ ...prev, phone: formattedValue }));
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

      const updatedEmployee = {
        ...formData,
        birthday: formattedBirthday,
      };

      await dispatch(updateEmployeeAsync(updatedEmployee)).unwrap();
      toast.success("Сотрудник успешно обновлен");
      navigate("/");
    } catch (err) {
      console.error("Error updating employee:", err);
      toast.error("Произошла ошибка при обновлении сотрудника");
    } finally {
      setIsLoading(false);
    }
  };

  if (!employee) {
    return <div>Сотрудник не найден</div>;
  }

  return (
    <div className="employee-edit">
      <h2>Редактирование сотрудника</h2>
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
          <label htmlFor="phone">Телефон (999) 999-99-99:</label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            onBlur={handlePhoneBlur}
            placeholder="(XXX) XXX-XX-XX"
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
            {isLoading ? "Сохранение..." : "Сохранить"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeEdit;
