import { Box, Button, Modal } from "@mui/material"
import { TodoForm } from "./TodoForm"
import { useEffect, useState } from "react"
import { Todo, uuid } from "@/types"
import { useStoreTodo } from "@/store"
import Image from "next/image"

interface Props {
    todo: Todo
}

export const DetailTodo = ({ todo }: Props) => {
    const [openEditTodo, setOpenEditTodo] = useState(false)

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
            <section className="flex flex-col gap-4">
                <Image src={`/assets/images/${todo?.portrait}`} alt={todo?.title} width={300} height={300} className=" object-contain w-full rounded-2xl" />
                <h2 className="font-bold text-3xl text-gray-800">{todo?.title}</h2>
                <p className=" text-ellipsis whitespace-nowrap overflow-hidden">{todo?.description}</p>
                <p className="text-gray-500 font-bold">Target date: {todo && new Date(todo?.target_date).toDateString()}</p>
                <p className="text-gray-500 font-bold">Created at: {todo && new Date(todo?.created_at).toDateString()}</p>
                <p className="text-gray-500 font-bold">Difficulty: {todo?.difficulty}</p>
                <p className="text-gray-500 font-bold">Priority: {todo?.priority}</p>
                <p className="text-gray-500 font-bold">Completed: {todo?.completed ? "Yes" : "No"}</p>
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