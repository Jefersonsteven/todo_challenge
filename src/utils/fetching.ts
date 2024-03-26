import { User } from "@/types";

const getUser = async (email: string, token: string): Promise<User> => {
  const response = await fetch(`/api/v1/users/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const user = await response.json();

  return user;
};

export { getUser };
