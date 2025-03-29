import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeesData from "../data/employees.json";
import { createSelector } from "reselect";

// Асинхронные действия
export const addEmployeeAsync = createAsyncThunk(
  "employees/addEmployee",
  async (employee) => {
    // В реальном приложении здесь был бы API-запрос
    return employee;
  }
);

export const updateEmployeeAsync = createAsyncThunk(
  "employees/updateEmployee",
  async (employee) => {
    return employee;
  }
);

const initialState = {
  employees: employeesData.employees,
  searchQuery: "",
  sortField: "name",
  sortDirection: "asc",
  showArchived: false,
  currentPage: 1,
  roleFilter: "",
};

// Селекторы для оптимизации производительности
export const selectEmployees = (state) => state.employees.employees;
export const selectSearchQuery = (state) => state.employees.searchQuery;
export const selectSortField = (state) => state.employees.sortField;
export const selectSortDirection = (state) => state.employees.sortDirection;
export const selectShowArchived = (state) => state.employees.showArchived;
export const selectRoleFilter = (state) => state.employees.roleFilter;
export const selectCurrentPage = (state) => state.employees.currentPage;

// Мемоизированный селектор для фильтрации и сортировки
export const selectFilteredEmployees = createSelector(
  [selectEmployees, selectSearchQuery, selectRoleFilter, selectShowArchived],
  (employees, searchQuery, roleFilter, showArchived) => {
    return employees.filter((employee) => {
      // Фильтр по архиву
      if (showArchived !== employee.isArchive) {
        return false;
      }

      // Фильтр по поиску
      if (
        searchQuery &&
        !employee.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Фильтр по должности
      if (roleFilter && employee.role !== roleFilter) {
        return false;
      }

      return true;
    });
  }
);

export const selectSortedEmployees = (state) => {
  const employees = selectFilteredEmployees(state);
  const sortField = state.employees.sortField;
  const sortDirection = state.employees.sortDirection;

  return [...employees].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortField === "birthday") {
      const [dayA, monthA, yearA] = aValue.split(".");
      const [dayB, monthB, yearB] = bValue.split(".");
      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    }

    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });
};

export const selectPaginatedEmployees = (state) => {
  const employees = selectSortedEmployees(state);
  const currentPage = state.employees.currentPage;
  const itemsPerPage = 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  return employees.slice(startIndex, startIndex + itemsPerPage);
};

export const selectTotalPages = (state) => {
  const employees = selectSortedEmployees(state);
  const itemsPerPage = 12;
  return Math.ceil(employees.length / itemsPerPage);
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortField: (state, action) => {
      state.sortField = action.payload;
    },
    setSortDirection: (state, action) => {
      state.sortDirection = action.payload;
    },
    setShowArchived: (state, action) => {
      state.showArchived = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setRoleFilter: (state, action) => {
      state.roleFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEmployeeAsync.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(updateEmployeeAsync.fulfilled, (state, action) => {
        const index = state.employees.findIndex(
          (emp) => emp.id === action.payload.id
        );
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      });
  },
});

export const {
  setSearchQuery,
  setSortField,
  setSortDirection,
  setShowArchived,
  setCurrentPage,
  setRoleFilter,
} = employeeSlice.actions;

export default employeeSlice.reducer;
