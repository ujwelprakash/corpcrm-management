import { useState } from "react";
import ModalWrapper from "../../../../../shared/components/ui/ModalWrapper";

export type LeaveTypeFormData = {
  title: string;
  days: number;
};

type Props = {
  onClose: () => void;
  onSubmit: (data: LeaveTypeFormData) => void;
};

const LeaveTypeModal = ({ onClose, onSubmit }: Props) => {
  const [form, setForm] = useState({
    title: "",
    days: "",
  });

  const handleSubmit = () => {
    if (!form.title.trim() || !form.days) return;

    onSubmit({
      title: form.title,
      days: Number(form.days),
    });
  };

  return (
    <ModalWrapper
      title="Add Leave Type"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {/* Title Input */}
      <div>
        <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-1">
          Leave Type Title
        </label>

        <input
          type="text"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          placeholder="Enter leave type"
          className="w-full border border-[rgb(var(--color-border))] rounded-lg px-3 py-2 text-sm bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] outline-none focus:border-[rgb(var(--accent))]"
        />
      </div>

      {/* Number of Days */}
      <div>
        <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-1">
          Number of Days
        </label>

        <input
          type="number"
          value={form.days}
          onChange={(e) =>
            setForm({ ...form, days: e.target.value })
          }
          placeholder="Enter number of days"
          className="w-full border border-[rgb(var(--color-border))] rounded-lg px-3 py-2 text-sm bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] outline-none focus:border-[rgb(var(--accent))]"
        />
      </div>
    </ModalWrapper>
  );
};

export default LeaveTypeModal;