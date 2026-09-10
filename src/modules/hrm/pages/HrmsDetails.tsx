import { RotateCcw } from "lucide-react";

const candidateData = [
  {
    code: "109742",
    name: "Antony Jaya Surya J",
    phone: "8870664014",
    email: "antonysurya208200@gmail.com",
    client: "Gokulam Courier Service",
    vertical: "Retail Sales",
    designation: "Contractor Associate",
    birthday: "2001-08-20",
    gender: "Male",
    status: "Inactive",
  },
  {
    code: "109715",
    name: "Raja R",
    phone: "9025699807",
    email: "rajario050@gmail.com",
    client: "Gokulam Courier Service",
    vertical: "Services",
    designation: "ECA",
    birthday: "1998-02-14",
    gender: "Male",
    status: "Inactive",
  },
  {
    code: "109684",
    name: "Mohammed Iliyas K",
    phone: "8760325625",
    email: "miliyas1515@gmail.com",
    client: "Gokulam Courier Service",
    vertical: "Services",
    designation: "ECA",
    birthday: "1998-04-15",
    gender: "Male",
    status: "Inactive",
  },
];

const HrmsDetails = () => {
  return (
    <div className="min-h-screen bg-[rgb(var(--color-bg-soft))] p-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-[rgb(var(--color-text))]">
          Manage Candidate
        </h1>

        <div className="flex items-center gap-2 text-xs mt-1">
          <span className="text-[rgb(var(--accent))]">Dashboard</span>

          <span className="text-[rgb(var(--color-text-muted))]">
            ›
          </span>

          <span className="text-[rgb(var(--color-text-soft))]">
            Candidate
          </span>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border))] rounded-xl p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
          <select className="w-full bg-[rgb(var(--color-bg))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text))] rounded-lg px-3 py-2 text-sm outline-none focus:border-[rgb(var(--accent))]">
            <option>Select Year</option>
          </select>

          <select className="w-full bg-[rgb(var(--color-bg))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text))] rounded-lg px-3 py-2 text-sm outline-none focus:border-[rgb(var(--accent))]">
            <option>Select Client</option>
          </select>

          <select className="w-full bg-[rgb(var(--color-bg))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text))] rounded-lg px-3 py-2 text-sm outline-none focus:border-[rgb(var(--accent))]">
            <option>Select State</option>
          </select>

          <select className="w-full bg-[rgb(var(--color-bg))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text))] rounded-lg px-3 py-2 text-sm outline-none focus:border-[rgb(var(--accent))]">
            <option>Select Designation</option>
          </select>

          <select className="w-full bg-[rgb(var(--color-bg))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text))] rounded-lg px-3 py-2 text-sm outline-none focus:border-[rgb(var(--accent))]">
            <option>Select Employee Code</option>
          </select>

          <select className="w-full bg-[rgb(var(--color-bg))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text))] rounded-lg px-3 py-2 text-sm outline-none focus:border-[rgb(var(--accent))]">
            <option>Select Status</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            className="px-4 py-2 rounded-lg text-sm text-white"
            style={{ background: "rgb(var(--accent))" }}
          >
            Search
          </button>

          <button className="px-3 py-2 rounded-lg text-white bg-[rgb(var(--color-text-soft))]">
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border))] rounded-xl p-4">
        {/* Table Top */}
        <div className="flex items-center justify-between mb-4">
          <select className="bg-[rgb(var(--color-bg))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text))] rounded-lg px-2 py-2 text-sm outline-none">
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>

          <input
            type="text"
            placeholder="Search..."
            className="bg-[rgb(var(--color-bg))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text))] rounded-lg px-3 py-2 text-sm outline-none focus:border-[rgb(var(--accent))]"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[rgb(var(--color-bg-muted))]">
              <tr className="text-left">
                <th className="px-4 py-3 text-[rgb(var(--color-text-soft))] font-semibold">
                  EMPLOYEE CODE
                </th>

                <th className="px-4 py-3 text-[rgb(var(--color-text-soft))] font-semibold">
                  NAME
                </th>

                <th className="px-4 py-3 text-[rgb(var(--color-text-soft))] font-semibold">
                  PHONE
                </th>

                <th className="px-4 py-3 text-[rgb(var(--color-text-soft))] font-semibold">
                  EMAIL
                </th>

                <th className="px-4 py-3 text-[rgb(var(--color-text-soft))] font-semibold">
                  CLIENT
                </th>

                <th className="px-4 py-3 text-[rgb(var(--color-text-soft))] font-semibold">
                  VERTICAL
                </th>

                <th className="px-4 py-3 text-[rgb(var(--color-text-soft))] font-semibold">
                  DESIGNATION
                </th>

                <th className="px-4 py-3 text-[rgb(var(--color-text-soft))] font-semibold">
                  BIRTHDAY
                </th>

                <th className="px-4 py-3 text-[rgb(var(--color-text-soft))] font-semibold">
                  GENDER
                </th>

                <th className="px-4 py-3 text-[rgb(var(--color-text-soft))] font-semibold">
                  STATUS
                </th>
              </tr>
            </thead>

            <tbody>
              {candidateData.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-[rgb(var(--color-border-soft))] hover:bg-[rgb(var(--color-bg-soft))]"
                >
                  <td className="px-4 py-3">
                    <span className="border border-[rgb(var(--accent))] text-[rgb(var(--accent))] rounded-md px-3 py-1 text-xs font-medium">
                      {item.code}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-[rgb(var(--color-text))]">
                    {item.name}
                  </td>

                  <td className="px-4 py-3 text-[rgb(var(--color-text-soft))]">
                    {item.phone}
                  </td>

                  <td className="px-4 py-3 text-[rgb(var(--color-text-soft))]">
                    {item.email}
                  </td>

                  <td className="px-4 py-3 text-[rgb(var(--color-text-soft))]">
                    {item.client}
                  </td>

                  <td className="px-4 py-3 text-[rgb(var(--color-text-soft))]">
                    {item.vertical}
                  </td>

                  <td className="px-4 py-3 text-[rgb(var(--color-text-soft))]">
                    {item.designation}
                  </td>

                  <td className="px-4 py-3 text-[rgb(var(--color-text-soft))]">
                    {item.birthday}
                  </td>

                  <td className="px-4 py-3 text-[rgb(var(--color-text-soft))]">
                    {item.gender}
                  </td>

                  <td className="px-4 py-3">
                    <span className="text-[rgb(var(--accent))] font-medium">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HrmsDetails;