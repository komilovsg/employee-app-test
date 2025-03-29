import { validateForm } from "../validation";

describe("validateForm", () => {
  const validFormData = {
    name: "John Doe",
    phone: "+7 (999) 123-45-67",
    birthday: "2024-03-29",
    role: "cook",
  };

  it("should return empty errors object for valid form data", () => {
    const errors = validateForm(validFormData);
    expect(errors).toEqual({});
  });

  it("should validate required name field", () => {
    const errors = validateForm({ ...validFormData, name: "" });
    expect(errors.name).toBe("Имя обязательно для заполнения");
  });

  it("should validate required phone field", () => {
    const errors = validateForm({ ...validFormData, phone: "" });
    expect(errors.phone).toBe("Номер телефона обязателен для заполнения");
  });

  it("should validate phone number format", () => {
    const errors = validateForm({ ...validFormData, phone: "123" });
    expect(errors.phone).toBe("Номер телефона должен содержать 11 цифр");
  });

  it("should validate phone number starting with 0", () => {
    const errors = validateForm({
      ...validFormData,
      phone: "+7 (012) 345-67-89",
    });
    expect(errors.phone).toBe(
      "Номер не может начинаться с 0 после кода страны"
    );
  });

  it("should validate required birthday field", () => {
    const errors = validateForm({ ...validFormData, birthday: "" });
    expect(errors.birthday).toBe("Дата рождения обязательна для заполнения");
  });

  it("should validate required role field", () => {
    const errors = validateForm({ ...validFormData, role: "" });
    expect(errors.role).toBe("Должность обязательна для заполнения");
  });

  it("should validate multiple fields at once", () => {
    const errors = validateForm({
      name: "",
      phone: "",
      birthday: "",
      role: "",
    });
    expect(errors).toEqual({
      name: "Имя обязательно для заполнения",
      phone: "Номер телефона обязателен для заполнения",
      birthday: "Дата рождения обязательна для заполнения",
      role: "Должность обязательна для заполнения",
    });
  });
});
