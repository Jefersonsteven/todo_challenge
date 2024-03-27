import { Todo, TodoCreate, User, uuid } from "@/types";

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

const createTodo = async (userId: uuid, token: string, todo: TodoCreate) => {
  const response = await fetch(`/api/v1/todo/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(todo),
  });
  const data: Todo = await response.json();
  return data;
};

const updateTodo = async (token: string, todo: Todo) => {
  const response = await fetch(`/api/v1/todo/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(todo),
  });
  const data: Todo = await response.json();
  return data;
};

const deleteTodo = async (token: string, todo: Todo) => {
  const response = await fetch(`/api/v1/todo/${todo.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data: Todo = await response.json();
  return data;
};

export { getUser, getTodos, createTodo, updateTodo, deleteTodo };
