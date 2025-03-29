export const filterAndSortEmployees = (
  employees,
  { showArchived, searchQuery, sortField, sortDirection, roleFilter }
) => {
  let filteredEmployees = [...employees];

  // Фильтрация по архиву
  filteredEmployees = filteredEmployees.filter(
    (emp) => emp.isArchive === showArchived
  );

  // Фильтрация по должности
  if (roleFilter) {
    filteredEmployees = filteredEmployees.filter(
      (emp) => emp.role === roleFilter
    );
  }

  // Фильтрация по поиску
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredEmployees = filteredEmployees.filter((emp) =>
      emp.name.toLowerCase().includes(query)
    );
  }

  // Сортировка
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
