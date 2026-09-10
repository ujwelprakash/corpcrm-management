type Props = {
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
};

const ModalWrapper = ({ title, onClose, onSubmit, children }: Props) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center"
    style={{ background: "rgba(0,0,0,0.4)" }}
    onClick={e => e.target === e.currentTarget && onClose()}
  >
    <div
      className="bg-[rgb(var(--color-surface))] rounded-xl shadow-xl w-full max-w-md mx-4"
      style={{ border: "1px solid rgb(var(--color-border))" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[rgb(var(--color-border))]">
        <h2 className="text-base font-semibold text-[rgb(var(--color-text))]">{title}</h2>
        <button onClick={onClose} className="text-[rgb(var(--color-text-muted))] hover:text-[rgb(var(--color-text))]">✕</button>
      </div>

      {/* Body — your custom fields go here */}
      <div className="px-6 py-5 space-y-4">{children}</div>

      {/* Footer */}
      <div className="flex justify-end gap-3 px-6 py-4 border-t border-[rgb(var(--color-border))]">
        <button
          onClick={onClose}
          className="px-5 py-2 rounded-lg text-sm font-medium border border-[rgb(var(--color-border))] text-[rgb(var(--color-text-soft))]"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="px-5 py-2 rounded-lg text-sm font-medium text-white"
          style={{ background: "rgb(var(--accent))" }}
        >
          Create
        </button>
      </div>
    </div>
  </div>
);

export default ModalWrapper;