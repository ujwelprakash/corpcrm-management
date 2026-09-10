import {useState } from "react";
import ModalWrapper from "../../../../../shared/components/ui/ModalWrapper";

type Props = {
  onClose: () => void;
  onSubmit: (data: {
    branch: string;
    title: string;
    description: string;
    file: File | null;
  }) => void;
};



const AwardTypeModal = ({ onClose, onSubmit }: Props) => {
  const [form, setForm] = useState({ branch: "", title: "", description: "" });

  const handleSubmit = () => {
    if (!form.branch || !form.title) return;
    onSubmit({ ...form, file });
  };

  return (
    <ModalWrapper title="Create New Award Type" onClose={onClose} onSubmit={handleSubmit}>
      
       {/* Title */}
      <div>
        <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-1">Name</label>
        <input
          type="text"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          placeholder="Enter title"
          className="w-full border border-[rgb(var(--color-border))] rounded-lg px-3 py-2 text-sm bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] outline-none focus:border-[rgb(var(--accent))]"
        />
      </div>
    </ModalWrapper>
  );
};

export default AwardTypeModal;