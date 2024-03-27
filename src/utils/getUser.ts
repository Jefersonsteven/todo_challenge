import { User } from "@/types";

export const getUser = () => {
  const data = localStorage.getItem("user");
  const user: User = data ? JSON.parse(data) : null;

  if (user) return user;
  return null;
};
