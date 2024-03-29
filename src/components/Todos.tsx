import { useStoreTodo } from "@/store"
import { Todo } from "@/types"
import Image from "next/image"
import { useEffect, useState } from "react"
import getToken from "@/utils/getToken"
import { getUser } from "@/utils/getUser"
import { Box, Modal } from "@mui/material"
import { DetailTodo } from "./DetailTodo"

interface Props {
    todo: Todo
}

const TodoItem = ({ todo }: Props) => {
    const [openDetailTodo, setOpenDetailTodo] = useState(false)
    const target_date = new Date(todo.target_date)
    const created_at = new Date(todo.created_at)
    return (
        <>
            <article
                onClick={() => setOpenDetailTodo(true)}
                className={`
                   ${todo.completed ? "border-e-green-500" : "border-gray-800"}
                    relative h-full 
                    max-w-96 max-h-48 overflow-hidden 
                    rounded-xl bg-slate-300 border-2 
                   cursor-pointer 
                    hover:shadow-lg hover:scale-105 transition-all
                `}
            >
                <Image
                    src={`/assets/images/${todo.portrait}`}
                    alt={todo.title}
                    width={300}
                    height={300}
                    className=" object-contain w-full opacity-10"
                />
                <main className=" flex flex-col gap-4 p-4 absolute top-0 left-0 h-full w-full">
                    <section className="flex justify-between">
                        <span className="text-gray-500">{created_at.toDateString()}</span>
                        <span
                            className={`p-1 text-white rounded-md ${todo.completed ? "bg-green-500" : "bg-gray-800"}`}
                        >
                            {todo.completed ? "Completed" : "Pending"}
                        </span>
                    </section>
                    <section className=" flex flex-col gap-4">
                        <h2 className="font-bold text-xl text-gray-800">{todo.title}</h2>
                        <p className=" text-ellipsis whitespace-nowrap overflow-hidden">{todo.description}</p>
                        <p className="text-gray-500 font-bold">Target date: {target_date.toDateString()}</p>
                    </section>
                </main>
            </article>

            {/* DetailTodo component modal is used here */}
            <Modal
                open={openDetailTodo}
                onClose={() => setOpenDetailTodo(false)}
                aria-labelledby="Detail Todo Challenge"
                aria-describedby="Detail of a todo challenge"
                className="flex justify-center items-start backdrop-blur-sm"
            >
                <Box className=" p-8 bg-stone-50 rounded-b-3xl animate-slide-up">
                    <DetailTodo todo={todo} />
                </Box>
            </Modal>
        </>
    )
}


export const Todos = () => {
    const todos = useStoreTodo(state => state.todos)
    const setTodos = useStoreTodo(state => state.setTodos)

    useEffect(() => {
        const token = getToken()
        const user = getUser()
        if (user && token) setTodos(user.id, token?.token)
    }, [setTodos])

    return (
        <section className="flex gap-8 flex-wrap">
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </section>
    )
}