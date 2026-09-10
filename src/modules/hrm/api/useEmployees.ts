import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "./employeeApi";
import type { Employee } from "../types/employee";

export const useEmployees = () => {
  return useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });
};
