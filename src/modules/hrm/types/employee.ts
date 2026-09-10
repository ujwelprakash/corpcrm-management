export interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  location: string;
  manager: string;
  startDate: string;
  status: "active" | "inactive";
}
