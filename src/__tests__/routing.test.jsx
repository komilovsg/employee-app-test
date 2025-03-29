import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../redux/employeeSlice";
import App from "../App";

const createTestStore = () => {
  return configureStore({
    reducer: {
      employees: employeeReducer,
    },
  });
};

const renderWithProviders = (component) => {
  const store = createTestStore();
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe("Routing", () => {
  it("should render home page by default", () => {
    renderWithProviders(<App />);
    expect(screen.getByText(/Список сотрудников/i)).toBeInTheDocument();
  });

  it("should render add employee page when navigating to /add", () => {
    renderWithProviders(<App />);
    const addButton = screen.getByText(/Добавить сотрудника/i);
    addButton.click();
    expect(screen.getByText(/Добавление сотрудника/i)).toBeInTheDocument();
  });

  it("should render edit employee page when navigating to /edit/:id", () => {
    renderWithProviders(<App />);
    const editButton = screen.getByTestId("edit-button-1");
    editButton.click();
    expect(screen.getByText(/Редактирование сотрудника/i)).toBeInTheDocument();
  });

  it("should navigate back to home page when clicking cancel button", () => {
    renderWithProviders(<App />);
    const addButton = screen.getByText(/Добавить сотрудника/i);
    addButton.click();
    const cancelButton = screen.getByText(/Отмена/i);
    cancelButton.click();
    expect(screen.getByText(/Список сотрудников/i)).toBeInTheDocument();
  });

  it("should handle 404 page for invalid routes", () => {
    renderWithProviders(<App />);
    window.history.pushState({}, "", "/invalid-route");
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });

  it("should maintain state when navigating between pages", () => {
    renderWithProviders(<App />);
    const searchInput = screen.getByPlaceholderText(/Поиск/i);
    searchInput.value = "test";
    const addButton = screen.getByText(/Добавить сотрудника/i);
    addButton.click();
    const cancelButton = screen.getByText(/Отмена/i);
    cancelButton.click();
    expect(searchInput.value).toBe("test");
  });
});
