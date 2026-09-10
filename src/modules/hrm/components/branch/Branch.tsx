import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import TableWrapper from "../../../../shared/components/ui/TableWrapper";
import BranchModal from "./modals/BranchModal";

export interface Branch {
  id: number;
  name: string;
}

export type BranchFormData = Omit<Branch, "id">;

const initialData: Branch[] = [
  { id: 1, name: "CLIENTS" },
  { id: 2, name: "CASPIAN" },
];

const columnHelper = createColumnHelper<Branch>();

const Branch = () => {
  const [data, setData] = useState<Branch[]>(initialData);
  const [showModal, setShowModal] = useState(false);

  const handleAdd = (formData: BranchFormData) => {
    const newBranch: Branch = {
      id: Date.now(),
      ...formData,
    };

    setData((prev) => [...prev, newBranch]);
  };

  const handleEdit = (branch: Branch) => {
    console.log("Edit:", branch);
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const columns = [
    columnHelper.accessor("name", {
      header: "Branch",
    }),

    columnHelper.display({
      id: "actions",
      header: "Action",

      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full text-white"
            style={{ background: "rgb(var(--accent))" }}
            onClick={() => handleEdit(row.original)}
          >
            ✏️
          </button>

          <button
            className="w-8 h-8 flex items-center justify-center rounded-full text-white bg-gray-600"
            onClick={() => handleDelete(row.original.id)}
          >
            🗑️
          </button>
        </div>
      ),
    }),
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[rgb(var(--color-text))]">
          Branch
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-lg text-sm text-white"
          style={{ background: "rgb(var(--accent))" }}
        >
          + Add Branch
        </button>
      </div>

      <TableWrapper
        data={data}
        columns={columns}
        title="Branch"
        subtitle="Manage Branches"
      />

      {showModal && (
        <BranchModal
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

export default Branch;