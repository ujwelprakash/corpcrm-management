import { useState } from "react";
import ModalWrapper from "../../../shared/components/ui/ModalWrapper";

const initialPolicies = [
  {
    id: 1,
    title: "Leave Policy",
    category: "HR",
    status: "Active",
    updatedAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Code of Conduct",
    category: "General",
    status: "Active",
    updatedAt: "2024-02-10",
  },
  {
    id: 3,
    title: "Remote Work Policy",
    category: "Operations",
    status: "Draft",
    updatedAt: "2024-03-05",
  },
];

const emptyForm = {
  title: "",
  category: "",
  status: "Active",
};

const CompanyPolicy = () => {

  const [policies, setPolicies] = useState(initialPolicies);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = () => {
    if (!form.title || !form.category) return;

    if (editId !== null) {
      setPolicies(
        policies.map((p) =>
          p.id === editId
            ? {
                ...p,
                ...form,
                updatedAt: new Date().toISOString().slice(0, 10),
              }
            : p
        )
      );

      setEditId(null);
    } else {
      setPolicies([
        ...policies,
        {
          id: Date.now(),
          ...form,
          updatedAt: new Date().toISOString().slice(0, 10),
        },
      ]);
    }

    setForm(emptyForm);
    setShowForm(false);
  };

  const handleEdit = (policy: (typeof initialPolicies)[0]) => {
    setForm({
      title: policy.title,
      category: policy.category,
      status: policy.status,
    });
    setEditId(policy.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setPolicies(policies.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6 bg-[rgb(var(--color-bg-soft))] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[rgb(var(--color-text))]">
            Company Policies
          </h1>

          <p className="text-sm text-[rgb(var(--color-text-muted))] mt-0.5">
            {policies.length} policies total
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white"
          style={{ background: "rgb(var(--accent))" }}
        >
          + Add Policy
        </button>
      </div>

      {/* Form */}
     {showForm && (
  <ModalWrapper
    title={editId !== null ? "Edit Policy" : "Add Policy"}
    onClose={() => {
      setShowForm(false);
      setEditId(null);
      setForm(emptyForm);
    }}
    onSubmit={handleSubmit}
  >
    <div className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-1">
          Title
        </label>

        <input
          type="text"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          placeholder="Policy title"
          className="w-full border border-[rgb(var(--color-border))] rounded-lg px-3 py-2 text-sm bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] outline-none focus:border-[rgb(var(--accent))]"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-1">
          Category
        </label>

        <input
          type="text"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          placeholder="e.g. HR, General"
          className="w-full border border-[rgb(var(--color-border))] rounded-lg px-3 py-2 text-sm bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] outline-none focus:border-[rgb(var(--accent))]"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-1">
          Status
        </label>

        <select
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
          className="w-full border border-[rgb(var(--color-border))] rounded-lg px-3 py-2 text-sm bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] outline-none focus:border-[rgb(var(--accent))]"
        >
          <option value="Active">Active</option>
          <option value="Draft">Draft</option>
          <option value="Archived">Archived</option>
        </select>
      </div>
    </div>
  </ModalWrapper>
)}

      {/* Table */}
      <div className="bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border))] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-muted))]">
              <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[rgb(var(--color-text-muted))]">
                Title
              </th>

              <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[rgb(var(--color-text-muted))]">
                Category
              </th>
              
              <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[rgb(var(--color-text-muted))]">
                Status
              </th>

              <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[rgb(var(--color-text-muted))]">
                Updated
              </th>
              <th className="px-5 py-3" />
              </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr
                key={policy.id}
                className="border-b border-[rgb(var(--color-border))] last:border-0 hover:bg-[rgb(var(--color-bg-soft))] transition-colors">
                <td className="px-5 py-3 font-medium text-[rgb(var(--color-text))]">
                  {policy.title}
                </td>

                <td className="px-5 py-3 text-[rgb(var(--color-text-soft))]">
                  {policy.category}
                </td>

                <td className="px-5 py-3">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={
                      policy.status === "Active"
                        ? {
                            background: "rgba(16,185,129,0.1)",
                            color: "#10b981",
                          }
                        : policy.status === "Draft"
                        ? {
                            background: "rgb(var(--accent-light))",
                            color: "rgb(var(--accent))",
                          }
                        : {
                            background: "rgb(var(--color-bg-muted))",
                            color: "rgb(var(--color-text-muted))",
                          }}>
                    {policy.status}
                  </span>
                </td>
<td className="px-5 py-3 text-[rgb(var(--color-text-muted))]">
                  {policy.updatedAt}
                </td>
<td className="px-5 py-3">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => handleEdit(policy)}
                      className="px-3 py-1 rounded-lg text-xs font-medium border border-[rgb(var(--color-border))] text-[rgb(var(--color-text-soft))] hover:bg-[rgb(var(--color-bg-muted))] transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(policy.id)}
                      className="px-3 py-1 rounded-lg text-xs font-medium border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {policies.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-10 text-center text-[rgb(var(--color-text-muted))] text-sm">
                  No policies yet. Click "Add Policy" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyPolicy;