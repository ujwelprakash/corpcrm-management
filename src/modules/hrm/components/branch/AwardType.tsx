import { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import TableWrapper from "../../../../shared/components/ui/TableWrapper";
import AwardTypeModal from "./modals/AwardTypeModal";

export type AwardType = {
  id: number;
  branch: string;
  title: string;
  description: string;
  file: File | null;
};

export type AwardTypeFormData = Omit<AwardType, "id">;

const initialData: AwardType[] = [
  {
    id: 1,
    branch: "Branch 1",
    title: "Best Employee",
    description: "Award for best employee",
    file: null,
  },
  {
    id: 2,
    branch: "Branch 2",
    title: "Top Performer",
    description: "Award for top performer",
    file: null,
  },
];

const AwardType = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<AwardType[]>(initialData);

  const handleEdit = (item: AwardType) => {
    console.log("Edit:", item);
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAdd = (formData: AwardTypeFormData) => {
    const newItem: AwardType = {
      id: Date.now(),
      ...formData,
    };

    setData((prev) => [...prev, newItem]);
  };

  const columns = useMemo<ColumnDef<AwardType>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Award Type",
      },
      {
        accessorKey: "branch",
        header: "Branch",
      },
      {
        accessorKey: "description",
        header: "Description",
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
          Award Type
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-2 text-sm rounded-lg text-white"
          style={{ background: "rgb(var(--accent))" }}
        >
          + Award Type
        </button>
      </div>

      <TableWrapper
        data={data}
        columns={columns}
        title="Award Type"
        subtitle="Manage Award Types"
      />

      {showModal && (
        <AwardTypeModal
          onClose={() => setShowModal(false)}
          onSubmit={(formData: AwardTypeFormData) => {
            handleAdd(formData);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default AwardType;