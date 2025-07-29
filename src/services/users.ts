import { useMutation, useQuery } from "@tanstack/react-query";
import apiCall from "./apiCall";

export async function getUsers(page: number = 1, per_page = 10) {
  const res = await apiCall.get(`/users?page=${page}&per_page=${per_page}`);
  return res.data;
}

export const useGetUsers = (page: number, per_page: number) => {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers(page, per_page),
  });
};

export async function getUser(id: number) {
  const res = await apiCall.get(`/users/${id}`);
  return res.data;
}

export const useGetUser = (id: number) => {
  return useQuery({
    queryKey: [id],
    queryFn: () => getUser(id),
  });
};

export async function DeleteUser(id: number) {
  const res = await apiCall.delete(`/users/${id}`);
  return res.data;
}

export const useDeleteUser = () => {
  return useMutation({ mutationFn: DeleteUser });
};

export async function AddUser() {
  const res = await apiCall.post(`/users`);
  return res.data;
}

export const useAddUser = () => {
  return useMutation({ mutationFn: AddUser });
};

export async function UpdateUser(id: number, data: any) {
  const res = await apiCall.patch(`/users/${id}`, data);
  return res.data;
}

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => UpdateUser(id, data),
  });
};
