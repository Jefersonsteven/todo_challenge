'use client'
import { LoginForm } from "@/components/LoginForm";
import { UserLogin } from "@/types";
import { validateLoginForm } from "@/utils/validateAccessForms";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from 'js-cookie'


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

            const response = await fetch('/api/v1/access/login', {
                method: 'POST',
                body: formData
            })
            const data = await response.json()

            if (data.detail?.message === 'User not found') {
                setErrors({
                    ...errors,
                    username: data.detail.message
                })
            } else if (data.detail?.message === 'Password incorrect') {
                setErrors({
                    ...errors,
                    password: data.detail.message
                })
            } else {
                // save token in cookies
                Cookies.set('token', JSON.stringify({
                    token: data.token.access_token,
                    user: form.username
                }), {
                    expires: 1,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                })
                // save user in local storage
                localStorage.setItem('user', JSON.stringify(data.user))
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