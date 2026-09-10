import { Home, Search } from "lucide-react";
import { useParams } from "react-router-dom";

const mailData = [];

const clients = [
  { id: 1, name: "Gokulam Courier Service" },
  { id: 2, name: "Mail Services Clients" },
  { id: 3, name: "Logistics India" },
];

const ClientList = () => {
  const { clientId } = useParams();
  const client = clients.find((c) => c.id === Number(clientId));

  return (
    <div className="min-h-screen bg-[rgb(var(--color-bg-soft))] p-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-2xl font-semibold text-[rgb(var(--color-text))]">
            MailDetails / {client?.name ?? "Unknown Client"}
          </h1>

          <div className="flex items-center gap-2 mt-1 text-sm">
            <span className="text-[rgb(var(--accent))]">Dashboard</span>
            <span className="text-[rgb(var(--color-text-muted))]">›</span>
            <span className="text-[rgb(var(--color-text-soft))]">Mail List</span>
          </div>
        </div>

        {/* Home Button */}
        <button
          className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
          style={{ background: "rgb(var(--accent))" }}
        >
          <Home size={18} />
        </button>
      </div>

      {/* Filter Section */}
      <div className="bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border))] rounded-2xl p-5 mb-5">
        <div className="flex flex-wrap items-end gap-5">
          {/* From Date */}
          <div>
            <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-2">
              From Date
            </label>
            <input
              type="date"
              className="bg-[rgb(var(--color-bg))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text))] rounded-lg px-4 py-2.5 outline-none focus:border-[rgb(var(--accent))]"
            />
          </div>

          {/* To Date */}
          <div>
            <label className="block text-sm font-medium text-[rgb(var(--color-text))] mb-2">
              To Date
            </label>
            <input
              type="date"
              className="bg-[rgb(var(--color-bg))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text))] rounded-lg px-4 py-2.5 outline-none focus:border-[rgb(var(--accent))]"
            />
          </div>

          {/* Search Button */}
          <button
            className="h-[42px] px-6 rounded-lg flex items-center justify-center text-white"
            style={{ background: "rgb(var(--accent))" }}
          >
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border))] rounded-2xl overflow-hidden">
        {/* Table Top */}
        <div className="flex items-center justify-between p-5">
          <select className="bg-[rgb(var(--color-bg))] border border-[rgb(var(--color-border))] rounded-lg px-3 py-2 text-sm text-[rgb(var(--color-text))] outline-none">
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>

          <input
            type="text"
            placeholder="Search..."
            className="bg-[rgb(var(--color-bg))] border border-[rgb(var(--color-border))] rounded-lg px-4 py-2 text-sm text-[rgb(var(--color-text))] outline-none focus:border-[rgb(var(--accent))]"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[rgb(var(--color-bg-muted))]">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-semibold text-[rgb(var(--color-text-soft))] uppercase">
                  SLNO
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold text-[rgb(var(--color-text-soft))] uppercase">
                  Date
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold text-[rgb(var(--color-text-soft))] uppercase">
                  Type
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold text-[rgb(var(--color-text-soft))] uppercase">
                  Associate
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold text-[rgb(var(--color-text-soft))] uppercase">
                  SendDate
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold text-[rgb(var(--color-text-soft))] uppercase">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {mailData.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-[rgb(var(--color-text-muted))]"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Stats */}
        <div className="border-t border-[rgb(var(--color-border))] p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div
              className="rounded-lg py-3 text-center text-sm font-semibold text-white"
              style={{ background: "rgb(var(--accent))" }}
            >
              Send: 0
            </div>

            <div
              className="rounded-lg py-3 text-center text-sm font-semibold text-white"
              style={{ background: "rgb(var(--accent))" }}
            >
              Pending: 0
            </div>

            <div className="rounded-lg py-3 text-center text-sm font-semibold text-white bg-emerald-500">
              Mail Sent: 0
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientList;