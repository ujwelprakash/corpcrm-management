import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import TableWrapper from "../../../../shared/components/ui/TableWrapper";

import DesignationModal, {
  type DesignationFormData,
} from "./modals/DesignationModal";

type Designation = {
  id: number;
  name: string;
};

const mockData: Designation[] = [
  { id: 1, name: "Manager" },
  { id: 2, name: "Developer" },
  { id: 3, name: "Designer" },
  { id: 4, name: "HR Executive" },
];

const Designation = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAdd = (data: DesignationFormData) => {
    console.log("Add:", data);
  };

  const handleEdit = (item: Designation) => {
    console.log("Edit:", item);
  };

  const handleDelete = (id: number) => {
    console.log("Delete:", id);
  };

  const columns = useMemo<ColumnDef<Designation>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Designation",
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
          Designation
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-2 text-sm rounded-lg text-white"
          style={{ background: "rgb(var(--accent))" }}
        >
          + Add Designation
        </button>
      </div>

      <TableWrapper
        data={mockData}
        columns={columns}
        title="Designation"
        subtitle="Manage designations"
      />

      {showModal && (
        <DesignationModal
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

export default Designation;