import { createSlice } from "@reduxjs/toolkit";
import employeesData from "../data/employees.json";

const initialState = {
  employees: employeesData.employees,
  searchQuery: "",
  sortField: "name",
  sortDirection: "asc",
  showArchived: false,
  currentPage: 1,
  roleFilter: "",
};

export const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    toggleArchive: (state, action) => {
      const employee = state.employees.find((emp) => emp.id === action.payload);
      if (employee) {
        employee.isArchive = !employee.isArchive;
      }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setSortField: (state, action) => {
      state.sortField = action.payload;
    },
    setSortDirection: (state, action) => {
      state.sortDirection = action.payload;
    },
    setShowArchived: (state, action) => {
      state.showArchived = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setRoleFilter: (state, action) => {
      state.roleFilter = action.payload;
      state.currentPage = 1;
    },
  },
});

export const {
  addEmployee,
  updateEmployee,
  toggleArchive,
  setSearchQuery,
  setSortField,
  setSortDirection,
  setShowArchived,
  setCurrentPage,
  setRoleFilter,
} = employeeSlice.actions;

export default employeeSlice.reducer;
