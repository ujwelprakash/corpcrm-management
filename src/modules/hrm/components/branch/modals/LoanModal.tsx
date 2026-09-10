import { useState } from "react";
import ModalWrapper from "../../../../../shared/components/ui/ModalWrapper";

export type LoanOptionFormData = {
  name: string;
};

type Props = {
  onClose: () => void;
  onSubmit: (data: LoanOptionFormData) => void;
};

const LoanModal = ({ onClose, onSubmit }: Props) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;

    onSubmit({ name });
  };

  return (
    <ModalWrapper
      title="Add Loan Option"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-1">
          Loan Option Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter loan option name"
          className="w-full border border-[rgb(var(--color-border))] rounded-lg px-3 py-2 text-sm bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] outline-none focus:border-[rgb(var(--accent))]"
        />
      </div>
    </ModalWrapper>
  );
};

export default LoanModal;