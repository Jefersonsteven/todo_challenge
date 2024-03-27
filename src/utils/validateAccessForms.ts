import { UserCreate, UserLogin } from "@/types";
import { Dispatch } from "react";

interface validateLogin {
  form: UserLogin;
  setErrors: Dispatch<React.SetStateAction<UserLogin>>;
}

interface validateRegister {
  form: UserCreate;
  setErrors: Dispatch<React.SetStateAction<UserCreate>>;
}

export const validateLoginForm = ({
  form: { username, password },
  setErrors,
}: validateLogin) => {
  const newErrors: UserLogin = {
    username: "",
    password: "",
  };

  const PASSWORD_REGEX =
    /^(?=.*[0-9])(?=.*[!@#$%_.^&*])[a-zA-Z0-9!@#$%_.^&*]{8,}$/;
  if (password.length === 0) newErrors.password = "Password is required";
  else if (!PASSWORD_REGEX.test(password))
    newErrors.password =
      "Invalid password, The password must have at least 8 characters, at least one number and one sign (!@#$%_.^&*)";
  else newErrors.password = "";

  const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (username.length === 0) newErrors.username = "Email is required";
  else if (!EMAIL_REGEX.test(username)) newErrors.username = "Invalid email";
  else newErrors.username = "";

  setErrors(newErrors);
  if (newErrors.username === "" && newErrors.password === "") return true;
};

export const validateRegisterForm = ({
  form: { email, password, first_name, last_name },
  setErrors,
}: validateRegister) => {
  const newErrors: UserCreate = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  };

  const PASSWORD_REGEX =
    /^(?=.*[0-9])(?=.*[!@#$%_.^&*])[a-zA-Z0-9!@#$%_.^&*]{8,}$/;
  if (password.length === 0) newErrors.password = "Password is required";
  else if (!PASSWORD_REGEX.test(password))
    newErrors.password =
      "Invalid password, The password must have at least 8 characters, at least one number and one sign (!@#$%_.^&*)";
  else newErrors.password = "";

  const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (email.length === 0) newErrors.email = "Email is required";
  else if (!EMAIL_REGEX.test(email)) newErrors.email = "Invalid email";
  else newErrors.email = "";

  const NAME_REGEX = /^[a-zA-Z]+$/;
  if (first_name.length === 0) newErrors.first_name = "First name is required";
  else if (!NAME_REGEX.test(first_name))
    newErrors.first_name = "Invalid first name";
  else newErrors.first_name = "";

  if (last_name.length === 0) newErrors.last_name = "Last name is required";
  else if (!NAME_REGEX.test(last_name))
    newErrors.last_name = "Invalid lastname";
  else newErrors.last_name = "";

  setErrors(newErrors);
  if (
    newErrors.email === "" &&
    newErrors.password === "" &&
    newErrors.first_name === "" &&
    newErrors.last_name === ""
  )
    return true;
};
