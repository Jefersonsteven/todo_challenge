import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, TextareaAutosize } from "@mui/material"
import { Dispatch, SetStateAction, useState } from "react"
import { Difficulty, Priority, TodoCreate } from "@/types"

interface Props {
    closeForm: Dispatch<SetStateAction<boolean>>
    todoForm?: TodoCreate
}


const newTodo: TodoCreate = {
    title: '',
    description: '',
    priority: 1,
    difficulty: 1,
    target_date: new Date(),
    portrait: ''
}

export const TodoForm: React.FC<Props> = ({ closeForm, todoForm }) => {
    const [form, setForm] = useState<TodoCreate>(todoForm || newTodo)

    const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // TODO: Validate form

        // TODO: Send form to backend

        // finally
        closeForm(false)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // TODO: Validate form

        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            target_date: new Date(e.target.value)
        })
    }

    const handleSelectChange = (e: SelectChangeEvent<Difficulty | Priority>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <form className="flex flex-col" onSubmit={handleSumbit}>

            <h2 className=" text-2xl font-bold">
                {todoForm ? 'Edit Todochallenge' : 'Create new Todochallenge'}
            </h2>


            <TextField
                value={form.title}
                id="title"
                label="Title"
                variant="outlined"
                onChange={handleInputChange}
                helperText={""}
            />

            <div className="flex flex-col gap-2">
                <InputLabel id="description">Description</InputLabel>
                <textarea
                    id="description"
                    className=" text-xl border-gray-300 bg-transparent"
                    rows={3}
                    value={form.description}
                    onChange={handleInputChange}
                ></textarea>
            </div>

            <div className="flex gap-4">
                <FormControl fullWidth className="min-w-40">
                    <TextField
                        type="date"
                        onChange={handleDateChange}
                        value={form.target_date.toISOString().split('T')[0]}
                    ></TextField>
                </FormControl>

                <FormControl fullWidth className="min-w-40">
                    <InputLabel id="priority-select-label">Priority</InputLabel>
                    <Select
                        labelId="priority-select-label"
                        id="priority-select"
                        name="priority"
                        value={form.priority}
                        label="Priority"
                        onChange={handleSelectChange}
                    >
                        <MenuItem value="1">Low</MenuItem>
                        <MenuItem value="2">Medium</MenuItem>
                        <MenuItem value="3">High</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth className="min-w-40">
                    <InputLabel id="difficulty-select-label">Difficulty</InputLabel>
                    <Select
                        labelId="difficulty-select-label"
                        id="difficulty-select"
                        name="difficulty"
                        value={form.difficulty}
                        label="Difficulty"
                        onChange={handleSelectChange}
                    >
                        <MenuItem value="1">Easy</MenuItem>
                        <MenuItem value="2">Medium</MenuItem>
                        <MenuItem value="3">Hard</MenuItem>
                    </Select>
                </FormControl>
            </div>


            <Button type="submit" className="flex gap-2">
                {todoForm ? 'Edit Todo' : 'Create Todo'}
            </Button>

        </form>
    )
}