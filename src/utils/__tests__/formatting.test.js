import { describe, it, expect } from "@jest/globals";
import { formatDate, formatPhone } from "../formatting";

describe("formatDate", () => {
  it("should format date from DD.MM.YYYY to YYYY-MM-DD", () => {
    expect(formatDate("01.01.1990")).toBe("1990-01-01");
    expect(formatDate("31.12.2024")).toBe("2024-12-31");
    expect(formatDate("15.06.2000")).toBe("2000-06-15");
  });

  it("should handle invalid date format", () => {
    expect(formatDate("invalid")).toBe("");
    expect(formatDate("")).toBe("");
    expect(formatDate(null)).toBe("");
    expect(formatDate(undefined)).toBe("");
  });

  it("should handle edge cases", () => {
    expect(formatDate("00.00.0000")).toBe("0000-00-00");
    expect(formatDate("99.99.9999")).toBe("9999-99-99");
  });
});

describe("formatPhone", () => {
  it("should format phone number correctly", () => {
    expect(formatPhone("79991234567")).toBe("+7 (999) 123-45-67");
    expect(formatPhone("7999123456")).toBe("+7 (999) 123-45-6");
    expect(formatPhone("799912345")).toBe("+7 (999) 123-45");
    expect(formatPhone("79991234")).toBe("+7 (999) 123-4");
    expect(formatPhone("7999123")).toBe("+7 (999) 123");
    expect(formatPhone("799912")).toBe("+7 (999) 12");
    expect(formatPhone("79991")).toBe("+7 (999) 1");
    expect(formatPhone("7999")).toBe("+7 (999");
    expect(formatPhone("799")).toBe("+7 (79");
    expect(formatPhone("79")).toBe("+7 (7");
    expect(formatPhone("7")).toBe("+7");
  });

  it("should handle invalid phone numbers", () => {
    expect(formatPhone("")).toBe("");
    expect(formatPhone("123")).toBe("");
    expect(formatPhone("abcdef")).toBe("");
    expect(formatPhone("+7")).toBe("+7");
    expect(formatPhone("+7 (999)")).toBe("+7 (999");
  });

  it("should handle special characters", () => {
    expect(formatPhone("7-999-123-45-67")).toBe("+7 (999) 123-45-67");
    expect(formatPhone("7(999)1234567")).toBe("+7 (999) 123-45-67");
    expect(formatPhone("7 999 123 45 67")).toBe("+7 (999) 123-45-67");
  });

  it("should limit phone number length", () => {
    expect(formatPhone("7999123456789")).toBe("+7 (999) 123-45-67");
  });
});
