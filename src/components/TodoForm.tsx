import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, TextareaAutosize } from "@mui/material"
import { Dispatch, SetStateAction, useState } from "react"
import { Difficulty, ErrorsTodoCreate, Priority, TodoCreate } from "@/types"
import Image from "next/image"
import { PortraitSelect } from "./PortraitSelect"

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
    const [errors, setErrors] = useState<ErrorsTodoCreate>({
        title: '',
        description: '',
        priority: '',
        difficulty: '',
        target_date: '',
        portrait: ''
    })


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
                helperText={errors.title}
            />

            <div className="flex flex-col gap-2">
                <TextField
                    id="description"
                    label="Description"
                    multiline
                    rows={4}
                    value={form.description}
                    onChange={handleInputChange}
                    variant="outlined"
                    error={Boolean(errors.description)}
                    helperText={errors.description}
                >

                </TextField>
                <span>{errors.description}</span>
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

            <PortraitSelect form={form} setForm={setForm} setErrors={setErrors} error={errors.portrait} />

            <Button type="submit" className="flex gap-2">
                {todoForm ? 'Edit Todo' : 'Create Todo'}
            </Button>

        </form>
    )
}