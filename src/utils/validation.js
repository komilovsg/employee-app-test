export const validateForm = (formData) => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Имя обязательно для заполнения";
  }

  const phoneDigits = formData.phone.replace(/\D/g, "");
  if (!phoneDigits) {
    errors.phone = "Номер телефона обязателен для заполнения";
  } else if (phoneDigits.length !== 11) {
    errors.phone = "Номер телефона должен содержать 11 цифр";
  } else if (phoneDigits[1] === "0") {
    errors.phone = "Номер не может начинаться с 0 после кода страны";
  }

  if (!formData.birthday) {
    errors.birthday = "Дата рождения обязательна для заполнения";
  }

  if (!formData.role) {
    errors.role = "Должность обязательна для заполнения";
  }

  return errors;
};
