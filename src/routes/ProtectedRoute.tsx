import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import type { RootState } from "../app/store";

type Props = {
children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
const token = useSelector(
(state: RootState) => state.auth.token
);

// ❌ not logged in
if (!token) {
return <Navigate to="/auth/login" replace />;
}

// ✅ logged in
return children;
};

export default ProtectedRoute;
