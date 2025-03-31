import { describe, it, expect } from "@jest/globals";
import { filterAndSortEmployees } from "../filtering";

const mockEmployees = [
  { id: 1, name: "John Doe", isArchive: false },
  { id: 2, name: "Jane Smith", isArchive: true },
  { id: 3, name: "Bob Johnson", isArchive: false },
  { id: 4, name: "Alice Brown", isArchive: true },
];

describe("filterAndSortEmployees", () => {
  it("should filter out archived employees by default", () => {
    const result = filterAndSortEmployees(mockEmployees, {
      showArchived: false,
      searchQuery: "",
      sortField: "name",
      sortDirection: "asc",
    });
    expect(result).toHaveLength(2);
    expect(result.every((emp) => !emp.isArchive)).toBe(true);
  });

  it("should show all employees when showArchived is true", () => {
    const result = filterAndSortEmployees(mockEmployees, {
      showArchived: true,
      searchQuery: "",
      sortField: "name",
      sortDirection: "asc",
    });
    expect(result).toHaveLength(4);
  });

  it("should filter employees by search query", () => {
    const result = filterAndSortEmployees(mockEmployees, {
      showArchived: true,
      searchQuery: "john",
      sortField: "name",
      sortDirection: "asc",
    });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("John Doe");
  });

  it("should sort employees by name in ascending order", () => {
    const result = filterAndSortEmployees(mockEmployees, {
      showArchived: true,
      searchQuery: "",
      sortField: "name",
      sortDirection: "asc",
    });
    expect(result[0].name).toBe("Alice Brown");
    expect(result[result.length - 1].name).toBe("John Doe");
  });

  it("should sort employees by name in descending order", () => {
    const result = filterAndSortEmployees(mockEmployees, {
      showArchived: true,
      searchQuery: "",
      sortField: "name",
      sortDirection: "desc",
    });
    expect(result[0].name).toBe("John Doe");
    expect(result[result.length - 1].name).toBe("Alice Brown");
  });

  it("should handle empty search query", () => {
    const result = filterAndSortEmployees(mockEmployees, {
      showArchived: true,
      searchQuery: "",
      sortField: "name",
      sortDirection: "asc",
    });
    expect(result).toHaveLength(4);
  });

  it("should handle case-insensitive search", () => {
    const result = filterAndSortEmployees(mockEmployees, {
      showArchived: true,
      searchQuery: "JOHN",
      sortField: "name",
      sortDirection: "asc",
    });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("John Doe");
  });

  it("should handle partial matches in search", () => {
    const result = filterAndSortEmployees(mockEmployees, {
      showArchived: true,
      searchQuery: "oh",
      sortField: "name",
      sortDirection: "asc",
    });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("John Doe");
  });

  it("should return empty array when no matches found", () => {
    const result = filterAndSortEmployees(mockEmployees, {
      showArchived: true,
      searchQuery: "xyz",
      sortField: "name",
      sortDirection: "asc",
    });
    expect(result).toHaveLength(0);
  });
});
