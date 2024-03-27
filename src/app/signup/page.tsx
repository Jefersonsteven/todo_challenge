'use client'
import { RegisterForm } from "@/components/RegisterForm";
import { UserCreate, UserLogin } from "@/types";
import { validateLoginForm, validateRegisterForm } from "@/utils/validateAccessForms";
import { Router } from "next/router";
import { useState } from "react";
import { useRouter } from "next/navigation";


const SignupPage = () => {
    const router = useRouter()
    const [form, setForm] = useState<UserCreate>({
        email: '',
        password: '',
        last_name: '',
        first_name: ''
    })

    const [errors, setErrors] = useState<UserCreate>({
        email: '',
        password: '',
        last_name: '',
        first_name: ''
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (validateRegisterForm({ form, setErrors })) {

            const data = await fetch('/api/v1/access/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })

            const user = await data.json()
            console.log(user);

            if (user.detail === 'User already exists') {
                setForm({
                    ...form,
                    email: ''
                })
                setErrors({
                    ...errors,
                    email: user.detail
                })
            } else if (user.id) {
                // TODO: modal or toast to show success message
                router.push('/login')
            }
        }
    }

    return (
        <main className=" w-full h-screen bg-stone-50 flex justify-center items-center">
            <RegisterForm
                form={form}
                setForm={setForm}
                errors={errors}
                setErrors={setErrors}
                handleSubmit={handleSubmit}
            />
        </main>
    );
}

export default SignupPage