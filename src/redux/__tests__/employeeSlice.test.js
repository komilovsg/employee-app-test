import { configureStore } from "@reduxjs/toolkit";
import employeeReducer, {
  addEmployee,
  updateEmployee,
  toggleArchive,
  setSearchQuery,
  setSortField,
  setSortDirection,
} from "../employeeSlice";

describe("employeeSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        employees: employeeReducer,
      },
    });
  });

  const mockEmployee = {
    id: 1,
    name: "Test Employee",
    phone: "+7 (999) 123-45-67",
    birthday: "01.01.1990",
    role: "cook",
    isArchive: false,
  };

  describe("addEmployee", () => {
    it("should add a new employee to the list", () => {
      store.dispatch(addEmployee(mockEmployee));
      const state = store.getState().employees;
      expect(state.employees).toHaveLength(1);
      expect(state.employees[0]).toEqual(mockEmployee);
    });
  });

  describe("updateEmployee", () => {
    it("should update an existing employee", () => {
      store.dispatch(addEmployee(mockEmployee));
      const updatedEmployee = {
        ...mockEmployee,
        name: "Updated Name",
      };
      store.dispatch(updateEmployee(updatedEmployee));
      const state = store.getState().employees;
      expect(state.employees[0].name).toBe("Updated Name");
    });
  });

  describe("toggleArchive", () => {
    it("should toggle archive status of an employee", () => {
      store.dispatch(addEmployee(mockEmployee));
      store.dispatch(toggleArchive(mockEmployee.id));
      const state = store.getState().employees;
      expect(state.employees[0].isArchive).toBe(true);
    });
  });

  describe("setSearchQuery", () => {
    it("should update search query", () => {
      store.dispatch(setSearchQuery("test"));
      const state = store.getState().employees;
      expect(state.searchQuery).toBe("test");
    });
  });

  describe("setSortField", () => {
    it("should update sort field", () => {
      store.dispatch(setSortField("name"));
      const state = store.getState().employees;
      expect(state.sortField).toBe("name");
    });
  });

  describe("setSortDirection", () => {
    it("should update sort direction", () => {
      store.dispatch(setSortDirection("desc"));
      const state = store.getState().employees;
      expect(state.sortDirection).toBe("desc");
    });
  });

  describe("filteredEmployees selector", () => {
    it("should filter employees based on search query", () => {
      store.dispatch(addEmployee(mockEmployee));
      store.dispatch(setSearchQuery("Test"));
      const state = store.getState().employees;
      expect(state.filteredEmployees).toHaveLength(1);
      expect(state.filteredEmployees[0]).toEqual(mockEmployee);
    });

    it("should filter archived employees", () => {
      store.dispatch(addEmployee(mockEmployee));
      store.dispatch(toggleArchive(mockEmployee.id));
      store.dispatch(setShowArchived(true));
      const state = store.getState().employees;
      expect(state.filteredEmployees).toHaveLength(1);
      expect(state.filteredEmployees[0].isArchive).toBe(true);
    });

    it("should sort employees by name", () => {
      const employee1 = { ...mockEmployee, id: 1, name: "A" };
      const employee2 = { ...mockEmployee, id: 2, name: "B" };
      store.dispatch(addEmployee(employee2));
      store.dispatch(addEmployee(employee1));
      store.dispatch(setSortField("name"));
      store.dispatch(setSortDirection("asc"));
      const state = store.getState().employees;
      expect(state.filteredEmployees[0].name).toBe("A");
      expect(state.filteredEmployees[1].name).toBe("B");
    });
  });
});
