import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export default function Appointments() {
  // Adjust these endpoints to your actual backend paths
  const list = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => (await api.get("/summary")).data, // or GET /appointments
  });

  const qc = useQueryClient();
  const cancelMutation = useMutation({
    mutationFn: (id) => api.patch(`/${id}/cancel`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["appointments"] }),
  });

  if (list.isLoading) return "Loading...";
  return (
    <div>
      <h1 className="text-2xl mb-3">Appointments</h1>
      <ul className="space-y-2">
        {list.data?.map((a) => (
          <li key={a.id} className="p-3 border rounded flex justify-between">
            <div>
              <div>{a.patientName} — {a.date}</div>
              <div className="text-sm opacity-70">{a.reason}</div>
            </div>
            <button onClick={() => cancelMutation.mutate(a.id)} className="btn">Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
