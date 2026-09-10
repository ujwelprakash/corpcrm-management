import { useState } from "react";
import ModalWrapper from "../../../../../shared/components/ui/ModalWrapper";

export type DepartmentFormData = {
  branch: string;
  name: string;
};

type Props = {
  onClose: () => void;
  onSubmit: (data: DepartmentFormData) => void;
};

const branches = ["CLIENTS", "CASPIAN"];

const DepartmentModal = ({ onClose, onSubmit }: Props) => {
  const [form, setForm] = useState({
    branch: "",
    name: "",
  });

  const handleSubmit = () => {
    if (!form.branch || !form.name.trim()) return;

    onSubmit(form);
  };

  return (
    <ModalWrapper
      title="Add Department"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {/* Branch */}
      <div>
        <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-1">
          Branch
        </label>

        <select
          value={form.branch}
          onChange={(e) =>
            setForm({ ...form, branch: e.target.value })
          }
          className="w-full border border-[rgb(var(--color-border))] rounded-lg px-3 py-2 text-sm bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] outline-none focus:border-[rgb(var(--accent))]"
        >
          <option value="">Select Branch</option>

          {branches.map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </select>
      </div>

      {/* Department Name */}
      <div>
        <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-1">
          Department Name
        </label>

        <input
          type="text"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          placeholder="Enter department name"
          className="w-full border border-[rgb(var(--color-border))] rounded-lg px-3 py-2 text-sm bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] outline-none focus:border-[rgb(var(--accent))]"
        />
      </div>
    </ModalWrapper>
  );
};

export default DepartmentModal;