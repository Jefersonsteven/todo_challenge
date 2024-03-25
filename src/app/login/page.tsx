'use client'
import { LoginForm } from "@/components/LoginForm";
import { UserLogin } from "@/types";
import { validateLoginForm } from "@/utils/validateForms";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
    const router = useRouter()
    const [form, setForm] = useState<UserLogin>({
        username: '',
        password: ''
    })

    const [errors, setErrors] = useState<UserLogin>({
        username: '',
        password: ''
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (validateLoginForm({ form, setErrors })) {
            const formData = new FormData()
            formData.append('username', form.username)
            formData.append('password', form.password)
            formData.append('grand_type', 'password')
            formData.append('scope', '')
            formData.append('client_id', '')
            formData.append('client_secret', '')

            const data = await fetch('/api/v1/access/login', {
                method: 'POST',
                body: formData
            })
            const user = await data.json()

            if (user.detail?.message === 'User not found') {
                setErrors({
                    ...errors,
                    username: user.detail.message
                })
            } else if (user.detail?.message === 'Password incorrect') {
                setErrors({
                    ...errors,
                    password: user.detail.message
                })
            } else {
                localStorage.setItem('access_token', user.access_token)
                router.push('/home')
            }
        }
    }

    return (
        <main className=" w-full h-screen bg-stone-50 flex justify-center items-center">
            <LoginForm
                form={form}
                setForm={setForm}
                errors={errors}
                setErrors={setErrors}
                handleSubmit={handleSubmit}
            />
        </main>
    );
}

export default LoginPage