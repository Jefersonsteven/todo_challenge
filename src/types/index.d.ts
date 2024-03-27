import { UUID } from "crypto";

type uuid = UUID;

interface UserBase {
  email: string;
  password: string;
}

interface UserLogin {
  username: string;
  password: string;
}

interface UserCreate extends UserBase {
  first_name: string;
  last_name: string;
}

interface User extends UserCreate {
  photo: string;
  score: number;
  verified: boolean;
  is_admin: boolean;
  created_at: Date;
  updated_at: Date;
  id: uuid;
}

type Users = User[];

interface TodoBase {
  title: string;
  description: string;
}

interface TodoCreate extends TodoBase {
  portrait: string;
  priority: Priority;
  difficulty: Difficulty;
  target_date: Date;
}

interface Todo extends TodoCreate {
  id: uuid;
  completed: boolean;
  user_id: uuid;
  created_at: Date;
}

type Todos = Todo[];

enum Priority {
  Low = 1,
  Medium = 2,
  High = 3,
}

enum Difficulty {
  Easy = 1,
  Medium = 2,
  Hard = 3,
}

interface ErrorsTodoCreate {
  title: string;
  description: string;
  priority: string;
  difficulty: string;
  target_date: string;
  portrait: string;
}

interface Token {
  token: string;
  user: string;
}

export {
  UserBase,
  UserLogin,
  UserCreate,
  User,
  Users,
  TodoBase,
  TodoCreate,
  Todo,
  Todos,
  Priority,
  Difficulty,
  uuid,
  ErrorsTodoCreate,
  Token,
};
