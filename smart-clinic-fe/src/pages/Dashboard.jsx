import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => (await api.get("/me")).data,
  });

  if (isLoading) return "Loading...";
  return (
    <div>
      <h1 className="text-2xl mb-2">Welcome To the Smart Clinic {data?.name || data?.email}</h1>
      <p>Role: {data?.role}</p>
    </div>
  );
}
