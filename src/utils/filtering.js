export const filterAndSortEmployees = (
  employees,
  { showArchived, searchQuery, sortField, sortDirection, roleFilter }
) => {
  let filteredEmployees = sortField ? [...employees] : employees;

  filteredEmployees = filteredEmployees.filter((emp) => {
    if (emp.isArchive !== showArchived) return false;

    if (roleFilter && emp.role !== roleFilter) return false;

    if (
      searchQuery &&
      !emp.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    return true;
  });

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
