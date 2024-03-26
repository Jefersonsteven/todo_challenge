import { uuid } from "@/types";

const getUser = async (email: string, token: string) => {
  const response = await fetch(`/api/v1/users/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  console.log(data);

  return data;
};

export { getUser };
