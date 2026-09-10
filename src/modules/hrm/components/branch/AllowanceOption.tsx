import { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import TableWrapper from "../../../../shared/components/ui/TableWrapper";
import AllowanceModal from "./modals/AllowanceModal";

type AllowanceOption = {
  id: number;
  branch: string;
  title: string;
  description: string;
  file: File | null;
};

const AllowanceOption = () => {
  const [data, setData] = useState<AllowanceOption[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleAdd = (newItem: Omit<AllowanceOption, "id">) => {
    setData(prev => [...prev, { id: prev.length + 1, ...newItem }]);
  };

  const handleEdit = (item: AllowanceOption) => console.log("Edit:", item);
  const handleDelete = (id: number) => setData(prev => prev.filter(d => d.id !== id));

  const columns = useMemo<ColumnDef<AllowanceOption>[]>(() => [
    { accessorKey: "branch", header: "Branch" },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "description", header: "Description" },
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
  ], []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[rgb(var(--color-text))]">Allowance Option</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-2 text-sm rounded-lg text-white"
          style={{ background: "rgb(var(--accent))" }}
        >
          + Add Allowance
        </button>
      </div>

      <TableWrapper data={data} columns={columns} title="Allowance Option" subtitle="Manage allowance options" />

      {showModal && (
        <AllowanceModal
          onClose={() => setShowModal(false)}
          onSubmit={(newItem) => {
            handleAdd(newItem);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default AllowanceOption;