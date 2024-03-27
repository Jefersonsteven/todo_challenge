import { Box, Button, Modal } from "@mui/material"
import { TodoForm } from "./TodoForm"
import { useState } from "react"
import { Todo } from "@/types"
import Image from "next/image"
import Checkbox from '@mui/material/Checkbox';
import { updateTodo } from "@/utils/fetching"
import getToken from "@/utils/getToken"
import { useStoreTodo } from "@/store"
import { getUser } from "@/utils/getUser"

interface Props {
    todo: Todo
}

export const DetailTodo = ({ todo }: Props) => {
    const [openEditTodo, setOpenEditTodo] = useState(false)
    const setTodos = useStoreTodo(state => state.setTodos)
    const todos = useStoreTodo(state => state.todos)
    const updateTodos = useStoreTodo(state => state.updateTodos)

    async function handleComplete() {
        const token = getToken()
        const user = getUser()
        if (token && user) {
            updateTodos(todos.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t))
            const todoUpdated = await updateTodo(token.token, { ...todo, completed: !todo.completed })

            if (!todoUpdated) {
                updateTodos(todos.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t))
            }
        }
    }

    return (
        <>
            {/* EditTodoForm component modal is used here */}
            <Modal
                open={openEditTodo}
                onClose={() => setOpenEditTodo(false)}
                aria-labelledby="Edit Todo Challenge"
                aria-describedby="Form to edit a todo challenge"
                className="flex justify-center items-start backdrop-blur-sm"
            >
                <Box className=" p-8 bg-stone-50 rounded-b-3xl animate-slide-up">
                    <TodoForm
                        todoForm={{
                            ...todo,
                            target_date: new Date(todo.target_date),
                        }}
                        closeForm={setOpenEditTodo}
                        edit={true}
                    />
                </Box>
            </Modal>

            {/* DetailTodo component */}
            <section className="flex flex-col gap-4 max-w-[400px]">
                <Checkbox className="w-fit" checked={todo?.completed} onChange={handleComplete} />
                <Image src={`/assets/images/${todo?.portrait}`} alt={todo?.title} width={300} height={300} className=" object-contain w-full rounded-2xl" />
                <h2 className="font-bold text-3xl text-gray-800">{todo?.title}</h2>
                <p className=" text-wrap">{todo?.description}</p>
                <p className="text-gray-500 font-bold">Target date: {todo && new Date(todo?.target_date).toDateString()}</p>
                <p className="text-gray-500 font-bold">Created at: {todo && new Date(todo?.created_at).toDateString()}</p>
                <p className="text-gray-500 font-bold">Difficulty: {todo?.difficulty}</p>
                <p className="text-gray-500 font-bold">Priority: {todo?.priority}</p>
                <div className="flex justify-end w-full">
                    <Button
                        color="primary"
                        onClick={() => setOpenEditTodo(true)}
                    >
                        Edit
                    </Button>
                </div>
            </section>
        </>
    )
}