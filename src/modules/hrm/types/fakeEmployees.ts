import type { Employee } from "../types/employee";

let employees: Employee[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@test.com",
    role: "Developer",
    department: "Engineering",
    location: "Kozhikode",
    manager: "Jane Smith",
    startDate: "2026-01-15",
    status: "active",
  },
];

export const getEmployees = async (): Promise<Employee[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...employees]);
    }, 300);
  });
};

export const addEmployee = async (
  data: Omit<Employee, "id">,
): Promise<Employee> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEmployee: Employee = {
        id: Date.now(),
        ...data,
      };

      employees.push(newEmployee);

      resolve(newEmployee);
    }, 300);
  });
};
