import { TextareaAutosize } from "@mui/material"

export const TodoForm: React.FC = () => {
    return (
        <form>
            <input type="text" placeholder="Enter your todo" />
            <TextareaAutosize></TextareaAutosize>
            <button type="submit">Add Todo</button>
        </form>
    )
}