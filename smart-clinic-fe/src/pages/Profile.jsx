import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import api from "../api/axios";

export default function Profile() {
  const me = useQuery({ queryKey: ["me"], queryFn: async () => (await api.get("/me")).data });
  const { register, handleSubmit, reset } = useForm();

  const save = useMutation({
    mutationFn: (payload) => api.put("/me/profile", payload),
    onSuccess: () => me.refetch(),
  });

  if (me.isLoading) return "Loading...";

  const onSubmit = (data) => save.mutate(data);

  return (
    <div className="max-w-md">
      <h1 className="text-2xl mb-3">Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input defaultValue={me.data?.name} className="input" placeholder="Name" {...register("name")} />
        <input defaultValue={me.data?.phone} className="input" placeholder="Phone" {...register("phone")} />
        <button className="btn">Save</button>
        <button type="button" className="btn" onClick={() => reset(me.data)}>Reset</button>
      </form>
    </div>
  );
}
