import apiCall from "./apiCall";
import {useMutation} from "@tanstack/react-query";

export async function Login(data: any) {
  const res = await apiCall.post(`/register`, data);
  return res.data;
}

export const useLogin = () => {
  return useMutation({ mutationFn: Login });
};
