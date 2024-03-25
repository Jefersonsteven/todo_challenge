import { UserLogin } from "@/types";
import { Button, ButtonBase, FormControl, InputLabel, TextField } from "@mui/material";
import { Dispatch } from "react";
import { validateLoginForm } from "@/utils/validateForms";

interface Props {
    form: UserLogin
    setForm: Dispatch<React.SetStateAction<UserLogin>>
    errors: UserLogin
    setErrors: Dispatch<React.SetStateAction<UserLogin>>
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const LoginForm: React.FC<Props> = ({ form, setForm, handleSubmit, errors, setErrors }) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

        validateLoginForm({
            form: { ...form, [e.target.name]: e.target.value },
            setErrors
        })
    }

    return (
        <form onSubmit={handleSubmit} className=" flex flex-col p-4 gap-4 h-fit max-w-[500px]">
            <h2 className=" text-2xl font-bold">• Log in here!</h2>
            <TextField
                type="email"
                name='username'
                id="username"
                label="Email"
                value={form.username}
                onChange={handleInputChange}
                helperText={errors.username}
                error={Boolean(errors.username)}
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
            />

            <Button type="submit">Log in</Button>
        </form>
    );
}