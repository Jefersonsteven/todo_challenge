import { create } from "zustand";

import { Todo, User } from "../types";

const useStoreUser = create((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}));

const useStoreTodo = create((set) => ({
  todos: [],
  setTodos: (todos: Todo) => set({ todos }),
}));

export { useStoreUser, useStoreTodo };
