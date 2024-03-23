type uuid = "0000-0000-0000-0000";

interface UserBase {
  email: string;
}

interface UserLogin extends UserBase {
  password: string;
}

interface UserCreate extends UserLogin {
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
  priority: number;
  difficulty: number;
  target_date: Date;
}

interface Todo extends TodoCreate {
  id: uuid;
  completed: boolean;
}

type Todos = Todo[];
