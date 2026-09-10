import { Outlet } from "react-router-dom";

const HRMLayout = () => {
  return (
    <div>
      <h1>HRM Module</h1>
      <Outlet />
    </div>
  );
};

export default HRMLayout;