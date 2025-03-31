export const formatDate = (dateString) => {
  if (!dateString) return "Не указана";

  const [day, month, year] = dateString.split(".");
  const date = new Date(year, month - 1, day);

  if (isNaN(date.getTime())) {
    return "Неверный формат";
  }

  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
