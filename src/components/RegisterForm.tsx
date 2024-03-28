import { UserCreate } from "@/types";
import { validateRegisterForm } from "@/utils/validateAccessForms";
import { Button, TextField } from "@mui/material";
import { Dispatch } from "react";

interface Props {
    form: UserCreate
    setForm: Dispatch<React.SetStateAction<UserCreate>>
    errors: UserCreate
    setErrors: Dispatch<React.SetStateAction<UserCreate>>
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const RegisterForm = ({
    form,
    setForm,
    handleSubmit,
    errors,
    setErrors
}: Props) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

        validateRegisterForm({
            form: { ...form, [e.target.name]: e.target.value },
            setErrors
        })
    }

    return (
        <form onSubmit={handleSubmit} className=" p-4 flex flex-col gap-4 bg-">
            <h2 className=" text-2xl font-bold">• Register here!</h2>
            <TextField
                type="email"
                name='email'
                id="email"
                label="Email"
                value={form.email}
                onChange={handleInputChange}
                helperText={errors.email}
                error={Boolean(errors.email)}
                required
            />
            <TextField
                type="password"
                name='password'
                id="password"
                label="Password"
                value={form.password}
                onChange={handleInputChange}
                helperText={errors.password}
                error={Boolean(errors.password)}
                required
            />
            <TextField
                type="text"
                name='first_name'
                id="first_name"
                label="First Name"
                value={form.first_name}
                onChange={handleInputChange}
                helperText={errors.first_name}
                error={Boolean(errors.first_name)}
                required
            />
            <TextField
                type="text"
                name='last_name'
                id="last_name"
                label="Last Name"
                value={form.last_name}
                onChange={handleInputChange}
                helperText={errors.last_name}
                error={Boolean(errors.last_name)}
                required
            />

            <Button type="submit">Register</Button>
        </form>
    );
}