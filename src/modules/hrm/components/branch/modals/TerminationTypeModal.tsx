import { useState } from "react";
import ModalWrapper from "../../../../../shared/components/ui/ModalWrapper";

export type TerminationTypeFormData = {
  title: string;
};

type Props = {
  onClose: () => void;
  onSubmit: (data: TerminationTypeFormData) => void;
};

const TerminationTypeModal = ({ onClose, onSubmit }: Props) => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;

    onSubmit({ title });
  };

  return (
    <ModalWrapper
      title="Add Termination Type"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-1">
          Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          className="w-full border border-[rgb(var(--color-border))] rounded-lg px-3 py-2 text-sm bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] outline-none focus:border-[rgb(var(--accent))]"
        />
      </div>
    </ModalWrapper>
  );
};

export default TerminationTypeModal;