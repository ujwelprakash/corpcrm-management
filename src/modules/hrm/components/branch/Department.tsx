import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import TableWrapper from "../../../../shared/components/ui/TableWrapper";

import DepartmentModal, {
  type DepartmentFormData,
} from "./modals/DepartmentModal";

type Department = {
  id: number;
  name: string;
};

const mockData: Department[] = [
  { id: 1, name: "Human Resources" },
  { id: 2, name: "Finance" },
  { id: 3, name: "Engineering" },
];

const Department = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAdd = (data: DepartmentFormData) => {
    console.log("Add:", data);
  };

  const handleEdit = (item: Department) => {
    console.log("Edit:", item);
  };

  const handleDelete = (id: number) => {
    console.log("Delete:", id);
  };

  const columns = useMemo<ColumnDef<Department>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Department",
      },
      {
        id: "action",
        header: "Action",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(row.original)}
              className="px-3 py-1 text-sm rounded-lg text-white"
              style={{ background: "rgb(var(--accent))" }}
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(row.original.id)}
              className="px-3 py-1 text-sm rounded-lg text-white bg-red-500"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[rgb(var(--color-text))]">
          Department
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-2 text-sm rounded-lg text-white"
          style={{ background: "rgb(var(--accent))" }}
        >
          + Add Department
        </button>
      </div>

      <TableWrapper
        data={mockData}
        columns={columns}
        title="Department"
        subtitle="Manage departments"
      />

      {showModal && (
        <DepartmentModal
          onClose={() => setShowModal(false)}
          onSubmit={(formData) => {
            handleAdd(formData);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Department;