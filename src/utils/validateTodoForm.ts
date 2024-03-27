import { ErrorsTodoCreate, TodoCreate } from "@/types";
import { Dispatch } from "react";

interface Props {
  form: TodoCreate;
  setErrors: Dispatch<React.SetStateAction<ErrorsTodoCreate>>;
}

export const validateTodoForm = ({ form, setErrors }: Props) => {
  const newErrors: ErrorsTodoCreate = {
    title: "",
    description: "",
    priority: "",
    difficulty: "",
    target_date: "",
    portrait: "",
  };

  if (form.title.length === 0) newErrors.title = "Title is required";
  else if (form.title.length < 8)
    newErrors.title = "Title must be at most 8 characters";
  else newErrors.title = "";

  if (form.description.length === 1) {
    newErrors.description = "";
  } else if (form.description.length > 0 && form.description.length < 15)
    newErrors.description = "Description must be at least 15 characters";

  if (form.priority > 3)
    newErrors.priority = "Priority have to be between 1 and 3";
  else newErrors.priority = "";

  if (form.difficulty > 4)
    newErrors.difficulty = "Difficulty have to be between 1 and 3";
  else newErrors.difficulty = "";

  if (form.target_date.toString().length === 0)
    newErrors.target_date = "Target date is required";
  else newErrors.target_date = "";

  if (form.portrait.length === 0) newErrors.portrait = "Portrait is required";
  else newErrors.portrait = "";

  setErrors(newErrors);
  if (
    newErrors.title === "" &&
    newErrors.description === "" &&
    newErrors.priority === "" &&
    newErrors.difficulty === "" &&
    newErrors.target_date === "" &&
    newErrors.portrait === ""
  )
    return true;
};
