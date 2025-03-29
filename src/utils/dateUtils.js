export const formatDate = (dateString) => {
  if (!dateString) return "Не указана";

  // Разбиваем дату на части (DD.MM.YYYY)
  const [day, month, year] = dateString.split(".");

  // Создаем объект Date (месяц в JS начинается с 0, поэтому вычитаем 1)
  const date = new Date(year, month - 1, day);

  // Проверяем, что дата валидна
  if (isNaN(date.getTime())) {
    return "Неверный формат";
  }

  // Форматируем дату в русском формате
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
