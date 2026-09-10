
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import { useNavigate } from "react-router-dom";

const Employees = () => {
const navigate = useNavigate();
    

return ( <div className="space-y-4">

  {/* Header */}
  <div className="flex items-center justify-between">
    <h1 className="text-xl font-semibold">Employees</h1>

    <div className="flex items-center gap-2">
      {/* Future Button */}
      <button className="px-3 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-100" >
        Export
      </button>

      {/* Add Employee */}
      <button className="px-3 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-100" onClick={() => navigate("/hrm/employees/new")}>
        + Add Employee
      </button>
    </div>
  </div>


  {/* Table */}
  <EmployeeTable />
</div>

);
};

export default Employees;
