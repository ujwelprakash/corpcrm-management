import apiClient from "../../../app/client";
import type { Employee } from "../types/employee";

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await apiClient.get("/employees");

  return response.data;
};

export const getEmployee = async (id: string): Promise<Employee> => {
  const response = await apiClient.get(`/employees/${id}`);

  return response.data;
};

export const createEmployee = async (
  data: Omit<Employee, "id">,
): Promise<Employee> => {
  const response = await apiClient.post("/employees", data);

  return response.data;
};

export const updateEmployee = async (
  id: string,
  data: Partial<Employee>,
): Promise<Employee> => {
  const response = await apiClient.put(`/employees/${id}`, data);

  return response.data;
};

export const deleteEmployee = async (id: string) => {
  const response = await apiClient.delete(`/employees/${id}`);

  return response.data;
};
