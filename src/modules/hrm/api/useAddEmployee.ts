import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEmployee } from "../types/fakeEmployees"; // ← your actual file
import type { Employee } from "../types/fakeEmployees"; // ← type from same file

export const useAddEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Employee, "id">) => addEmployee(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },

    onError: (error: Error) => {
      console.error(error.message);
    },
  });
};