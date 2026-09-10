import type { ColumnDef } from "@tanstack/react-table";
import TableWrapper from "../../../shared/components/ui/TableWrapper";
import { useEmployees } from "../api/useEmployees";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

type Employee = {
  id: number;
  name: string;
  role: string;
  department: string;
};

const EmployeeTable = () => {
  const { data, isLoading } = useEmployees();
  const navigate = useNavigate(); // ✅ navigation hook

  // ✅ Handlers
  const handleEdit = (emp: Employee) => {
    console.log("Edit:", emp);
  };

  const handleDelete = (id: number) => {
    console.log("Delete:", id);
  };

const handleView = (employee: Employee) => {
  navigate(`/hrm/employees/${employee.id}`, {
    state: employee, // ✅ pass full object
  });
};

  // ✅ Columns
  const columns = useMemo<ColumnDef<Employee>[]>(() => [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "role", header: "Role" },
    { accessorKey: "department", header: "Department" },

    {
      id: "action",
      header: "Action",
      cell: ({ row }) => {
        const employee = row.original;

        return (
          <div style={{ display: "flex", gap: "8px" }}>
            {/* ✅ VIEW */}
            <button
             onClick={() => handleView(employee)}
              style={{
                padding: "4px 8px",
                backgroundColor: "#10b981",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              View
            </button>

            {/* EDIT */}
            <button
              onClick={() => handleEdit(employee)}
              style={{
                padding: "4px 8px",
                backgroundColor: "#3b82f6",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>

            {/* DELETE */}
            <button
              onClick={() => handleDelete(employee.id)}
              style={{
                padding: "4px 8px",
                backgroundColor: "#ef4444",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ], []);

  if (isLoading) {
    return <div>Loading employees...</div>;
  }

  return (
    <TableWrapper
      data={data ?? []}
      columns={columns}
      title="Employees"
      subtitle="All registered employees"
    />
  );
};

export default EmployeeTable;