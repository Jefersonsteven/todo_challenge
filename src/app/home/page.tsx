'use client'
import { TodoForm } from "@/components/CreateTodoForm";
import { Header } from "@/components/Header"
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";

const HomePage: React.FC = () => {
    const [firstname, lastname] = ['John', 'Doe']
    const [openFormTodo, setOpenFormTodo] = useState(false)
    return (
        <>
            {/* Header component is used here */}
            <Header />

            {/* Main content */}
            <main className=" p-8 flex flex-col gap-4">
                <h1 className=" font-bold text-4xl">Hello😊!! {firstname} {lastname}.</h1>
                <div className="w-full flex justify-end">
                    <Button
                        onClick={() => setOpenFormTodo(true)}
                        className="flex gap-2 px-6 py-4 bg-gray-800 w-fit h-fit rounded-full justify-center text-white hover:text-gray-800"
                    >
                        Create New Todochallenge
                        <AddIcon />
                    </Button>
                </div>

                {/* Todos component is used here */}
            </main>

            {/* Modals */}

            {/* CreateTodoForm component modal is used here */}
            <Modal
                open={openFormTodo}
                onClose={() => setOpenFormTodo(false)}
                aria-labelledby="Crear Todo Challenge"
                aria-describedby="formulario para crear un todo challenge"
                className="flex justify-center items-center backdrop-blur-sm"
            >
                <Box className=" w-96 h-96 bg-slate-900 rounded-3xl">
                    <TodoForm />
                </Box>
            </Modal>

            {/* DetailTodo component modal is used here */}

            {/* EditProfile component modal is used here */}
        </>
    )
}

export default HomePage