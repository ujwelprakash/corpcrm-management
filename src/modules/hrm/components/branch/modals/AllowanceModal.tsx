import { useRef, useState } from "react";
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

const branches = ["CLIENTS", "CASPIAN"];

const AllowanceModal = ({ onClose, onSubmit }: Props) => {
  const [form, setForm] = useState({ branch: "", title: "", description: "" });
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!form.branch || !form.title) return;
    onSubmit({ ...form, file });
  };

  return (
    <ModalWrapper title="Add Allowance Option" onClose={onClose} onSubmit={handleSubmit}>
      {/* Branch */}
      <div>
        <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-1">Branch</label>
        <select
          value={form.branch}
          onChange={e => setForm({ ...form, branch: e.target.value })}
          className="w-full border border-[rgb(var(--color-border))] rounded-lg px-3 py-2 text-sm bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] outline-none focus:border-[rgb(var(--accent))]"
        >
          <option value="">Select Branch</option>
          {branches.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-1">Title</label>
        <input
          type="text"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          placeholder="Enter title"
          className="w-full border border-[rgb(var(--color-border))] rounded-lg px-3 py-2 text-sm bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] outline-none focus:border-[rgb(var(--accent))]"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          rows={4}
          className="w-full border border-[rgb(var(--color-border))] rounded-lg px-3 py-2 text-sm bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] outline-none focus:border-[rgb(var(--accent))] resize-y"
        />
      </div>

      {/* Attachment */}
      <div>
        <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-1">Attachment</label>
        <input
          ref={fileRef}
          type="file"
          className="hidden"
          onChange={e => setFile(e.target.files?.[0] ?? null)}
        />
        <button
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
          style={{ background: "rgb(var(--accent))" }}
        >
          <span>⬆</span>
          {file ? file.name : "Choose file here"}
        </button>
      </div>
    </ModalWrapper>
  );
};

export default AllowanceModal;