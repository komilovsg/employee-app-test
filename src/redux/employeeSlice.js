import { createSlice } from "@reduxjs/toolkit";
import { employees } from "../data/employees";

const employeeSlice = createSlice({
  namr: "employees",
  initialState: employees,
  reducers: {
    addEmployee: (state, action) => {
      state.push(action.payload);
    },
    removeEmployee: (state, action) => {
      return state.filter((employee) => employee.id !== action.payload);
    },
    updateEmployee: (state, action) => {
      const index = state.findIndex((emp) => emp.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addEmployee, removeEmployee, updateEmployee } =
  employeeSlice.actions;
export default employeeSlice.reducer;
