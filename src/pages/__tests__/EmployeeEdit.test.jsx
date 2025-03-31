import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import EmployeeEdit from "../EmployeeEdit";
import employeeReducer from "../../redux/employeeSlice";

const createTestStore = (initialState) => {
  return configureStore({
    reducer: {
      employees: employeeReducer,
    },
    preloadedState: {
      employees: initialState,
    },
  });
};

describe("EmployeeEdit", () => {
  const mockEmployee = {
    id: 1,
    name: "Иван Петров",
    phone: "+7 (999) 123-45-67",
    birthday: "1990-05-15",
    role: "cook",
    isArchive: false,
  };

  const mockEmployees = [mockEmployee];

  it("отображает форму редактирования с данными сотрудника", () => {
    const store = createTestStore({
      employees: mockEmployees,
      filters: { name: "", role: "all", isArchive: false },
      sorting: { field: null, order: "asc" },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <EmployeeEdit />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/имя/i)).toHaveValue("Иван Петров");
    expect(screen.getByLabelText(/телефон/i)).toHaveValue("+7 (999) 123-45-67");
    expect(screen.getByLabelText(/дата рождения/i)).toHaveValue("1990-05-15");
    expect(screen.getByLabelText(/должность/i)).toHaveValue("cook");
    expect(screen.getByLabelText(/в архиве/i)).not.toBeChecked();
  });

  it("показывает ошибки валидации при пустых полях", async () => {
    const store = createTestStore({
      employees: mockEmployees,
      filters: { name: "", role: "all", isArchive: false },
      sorting: { field: null, order: "asc" },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <EmployeeEdit />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/имя/i), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText(/телефон/i), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText(/дата рождения/i), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText(/должность/i), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByText(/сохранить/i));

    await waitFor(() => {
      expect(
        screen.getByText(/имя обязательно для заполнения/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/телефон обязателен для заполнения/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/дата рождения обязательна для заполнения/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/должность обязательна для заполнения/i)
      ).toBeInTheDocument();
    });
  });
});
