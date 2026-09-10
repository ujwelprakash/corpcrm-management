import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

const clients = [
  {
    id: 1,
    name: "Gokulam Courier Service",
    employees: 2661,
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
  {
    id: 2,
    name: "Mail Services Clients",
    employees: 1240,
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
  {
    id: 3,
    name: "Logistics India",
    employees: 875,
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
];

const Mailmanage = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const handleNavigate = (clientId: number) => {
    navigate(`/hrm/clients/${clientId}/list`);
    setOpenDropdown(null);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--color-bg-soft))] p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[rgb(var(--color-text))]">
          Client Details
        </h1>

        <div className="flex items-center gap-2 mt-1 text-sm">
          <span className="text-[rgb(var(--accent))]">Dashboard</span>
          <span className="text-[rgb(var(--color-text-muted))]">›</span>
          <span className="text-[rgb(var(--color-text-soft))]">
            Mail Services Clients
          </span>
        </div>
      </div>

      {/* Client Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {clients.map((client) => (
          <div
            key={client.id}
            className="relative bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border))] rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            {/* Three Dot Menu */}
            <div className="absolute top-3 right-3">
              <button
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === client.id ? null : client.id
                  )
                }
                className="p-1 rounded-md hover:bg-[rgb(var(--color-bg-muted))]"
              >
                <MoreVertical
                  size={16}
                  className="text-[rgb(var(--color-text-soft))]"
                />
              </button>

              {/* Dropdown */}
              {openDropdown === client.id && (
                <div className="absolute right-0 mt-2 w-36 bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border))] rounded-lg shadow-lg overflow-hidden z-50">
                  <button
                    onClick={() => handleNavigate(client.id)}
                    className="w-full text-left px-3 py-2 text-sm text-[rgb(var(--color-text))] hover:bg-[rgb(var(--color-bg-soft))]"
                  >
                    List
                  </button>
                </div>
              )}
            </div>

            {/* Image */}
            <div className="flex justify-center mt-2">
              <img
                src={client.image}
                alt={client.name}
                className="w-16 h-16 rounded-full object-cover border border-[rgb(var(--color-border))]"
              />
            </div>

            {/* Name */}
            <div className="mt-3 text-center">
              <h2 className="text-sm font-semibold text-[rgb(var(--color-text))] line-clamp-2">
                {client.name}
              </h2>
            </div>

            {/* Employees */}
            <div
              className="mt-3 rounded-full py-1.5 text-center text-xs font-medium text-white"
              style={{ background: "rgb(var(--accent))" }}
            >
              {client.employees} Employees
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mailmanage;