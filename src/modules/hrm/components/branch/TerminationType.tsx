import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import TableWrapper from "../../../../shared/components/ui/TableWrapper";

import TerminationTypeModal, {
  type TerminationTypeFormData,
} from "./modals/TerminationTypeModal";

type TerminationTypeItem = {
  id: number;
  name: string;
};

const mockData: TerminationTypeItem[] = [
  { id: 1, name: "Test" },
  { id: 2, name: "Demo" },
  { id: 3, name: "Sample" },
  { id: 4, name: "Example" },
];

const TerminationType = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAdd = (data: TerminationTypeFormData) => {
    console.log("Add:", data);
  };

  const handleEdit = (item: TerminationTypeItem) => {
    console.log("Edit:", item);
  };

  const handleDelete = (id: number) => {
    console.log("Delete:", id);
  };

  const columns = useMemo<ColumnDef<TerminationTypeItem>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Termination Type",
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
          Termination Type
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-2 text-sm rounded-lg text-white"
          style={{ background: "rgb(var(--accent))" }}
        >
          + Termination Type
        </button>
      </div>

      <TableWrapper
        data={mockData}
        columns={columns}
        title="Termination Type"
        subtitle="Manage Termination Type"
      />

      {showModal && (
        <TerminationTypeModal
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

export default TerminationType;