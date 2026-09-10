import { useState } from "react";
import ModalWrapper from "../../../../../shared/components/ui/ModalWrapper";

export type DocumentTypeFormData = {
  name: string;
  isRequired: string;
};

type Props = {
  onClose: () => void;
  onSubmit: (data: DocumentTypeFormData) => void;
};

const requiredOptions = ["Required", "Is Required"];

const DocumentTypeModal = ({ onClose, onSubmit }: Props) => {
  const [form, setForm] = useState({
    name: "",
    isRequired: "",
  });

  const handleSubmit = () => {
    if (!form.name.trim() || !form.isRequired) return;

    onSubmit(form);
  };

  return (
    <ModalWrapper
      title="Add Document Type"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {/* Name Input */}
      <div>
        <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-1">
          Document Type Name
        </label>

        <input
          type="text"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          placeholder="Enter document type"
          className="w-full border border-[rgb(var(--color-border))] rounded-lg px-3 py-2 text-sm bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] outline-none focus:border-[rgb(var(--accent))]"
        />
      </div>

      {/* Required Dropdown */}
      <div>
        <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-1">
          Required
        </label>

        <select
          value={form.isRequired}
          onChange={(e) =>
            setForm({ ...form, isRequired: e.target.value })
          }
          className="w-full border border-[rgb(var(--color-border))] rounded-lg px-3 py-2 text-sm bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] outline-none focus:border-[rgb(var(--accent))]"
        >
          <option value="">Select Option</option>

          {requiredOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </ModalWrapper>
  );
};

export default DocumentTypeModal;