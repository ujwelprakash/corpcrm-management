
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEmployee } from "../types/fakeEmployees";

export const useAddEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof addEmployee>[0]) => addEmployee(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },

    onError: (error: Error) => {
      console.error(error.message);
    },
  });
};
