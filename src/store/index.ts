import { create } from "zustand";

import { Todo, User } from "../types";
import { getUser } from "@/utils/fetching";

const useStoreUser = create((set) => ({
  user: null,
  setUser: async (email: string, token: string) => {
    const user = await getUser(email, token);
    return set({ user });
  },
  updateUser: (user: User) => set({ user }),
}));

const useStoreTodo = create((set) => ({
  todos: [],
  setTodos: (todos: Todo) => set({ todos }),
}));

export { useStoreUser, useStoreTodo };
