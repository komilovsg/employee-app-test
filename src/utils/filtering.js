export const filterAndSortEmployees = (
  employees,
  { showArchived, searchQuery, sortField, sortDirection, roleFilter }
) => {
  // Создаем копию массива только если нужно сортировать
  let filteredEmployees = sortField ? [...employees] : employees;

  // Применяем фильтры последовательно
  filteredEmployees = filteredEmployees.filter((emp) => {
    // Фильтр по архиву
    if (emp.isArchive !== showArchived) return false;

    // Фильтр по должности
    if (roleFilter && emp.role !== roleFilter) return false;

    // Фильтр по поиску
    if (
      searchQuery &&
      !emp.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    return true;
  });

  // Сортировка только если указано поле и направление
  if (sortField && sortDirection) {
    filteredEmployees.sort((a, b) => {
      const aValue = a[sortField].toLowerCase();
      const bValue = b[sortField].toLowerCase();
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }

  return filteredEmployees;
};
