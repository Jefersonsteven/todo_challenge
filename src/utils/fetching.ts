import { User, uuid } from "@/types";

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

const getTodos = async (id: uuid, token: string) => {
  const response = await fetch(`/api/v1/todo/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const todos = await response.json();

  return todos;
};

export { getUser, getTodos };
