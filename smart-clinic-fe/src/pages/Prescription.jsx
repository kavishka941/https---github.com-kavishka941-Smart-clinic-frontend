import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export default function Prescription() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["prescription", id],
    queryFn: async () => (await api.get(`/prescriptions/${id}`)).data,
  });
  if (isLoading) return "Loading...";
  return (
    <div>
      <h1 className="text-2xl mb-2">Prescription #{id}</h1>
      <pre className="bg-gray-100 p-3 rounded">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
