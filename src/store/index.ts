import { create } from "zustand";

import { Todos, User, uuid } from "../types";
import { getTodos, getUser } from "@/utils/fetching";

const useStoreUser = create((set) => ({
  user: null,
  setUser: async (email: string, token: string) => {
    const user = await getUser(email, token);
    return set({ user });
  },
  updateUser: (user: User) => set({ user }),
}));

interface TodoState {
  todos: Todos;
  setTodos: (id: uuid, token: string) => void;
}

const useStoreTodo = create<TodoState>((set) => ({
  todos: [],
  setTodos: async (id: uuid, token: string) => {
    const todos = await getTodos(id, token);
    return set({ todos });
  },
}));

export { useStoreUser, useStoreTodo };
