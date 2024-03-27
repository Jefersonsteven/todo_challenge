'use client'
import { TodoForm } from "@/components/TodoForm";
import { Header } from "@/components/Header"
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import '@/app/styles/animations/animations.css'
import { Todos } from "@/components/Todos";
import { useStoreTodo } from "@/store";
import { getUser } from "@/utils/getUser";
import { User } from "@/types";

const HomePage: React.FC = () => {
    const user = getUser()
    const [openFormTodo, setOpenFormTodo] = useState(false)
    const [openDetailTodo, setOpenDetailTodo] = useState(false)

    return (
        <>
            {/* Header component is used here */}
            <Header />

            {/* Main content */}
            <main className=" p-8 flex flex-col gap-4">
                <h1 className=" font-bold text-4xl">Hello😊!! {user?.first_name} {user?.last_name}.</h1>
                <div className="w-full flex justify-end">
                    <Button
                        onClick={() => setOpenFormTodo(true)}
                        className="flex gap-2"
                    >
                        Create New Todochallenge
                        <AddIcon />
                    </Button>
                </div>

                <Todos />
            </main>

            {/* Modals */}

            {/* CreateTodoForm component modal is used here */}
            <Modal
                open={openFormTodo}
                onClose={() => setOpenFormTodo(false)}
                aria-labelledby="Crear Todo Challenge"
                aria-describedby="formulario para crear un todo challenge"
                className="flex justify-center items-start backdrop-blur-sm"
            >
                <Box className=" p-8 bg-stone-50 rounded-b-3xl animate-slide-up">
                    <TodoForm closeForm={setOpenFormTodo} />
                </Box>
            </Modal>

            {/* TODO: EditProfile component modal is used here */}
        </>
    )
}

export default HomePage