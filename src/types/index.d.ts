type uuid = "0000-0000-0000-0000";

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
};
