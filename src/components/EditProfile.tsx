import { getUser } from "@/utils/getUser"
import { Button, FormControl, TextField } from "@mui/material"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { EditPhoto } from "./EditPhoto"
import { User } from "@/types"

interface UserUpdateForm {
    first_name: string
    last_name: string
}

interface Props {
    setOpenEditProfile: Dispatch<SetStateAction<boolean>>
}

export const EditProfile = ({ setOpenEditProfile }: Props) => {
    const [user, setUser] = useState<User | null>(null)
    const [form, setForm] = useState<UserUpdateForm>({
        first_name: '',
        last_name: '',
    })
    const [errors, setErrors] = useState<UserUpdateForm>({
        first_name: '',
        last_name: '',
    })

    useEffect(() => {
        const user = getUser()
        if (user === null) return
        setUser(user)
        setForm({
            first_name: user.first_name,
            last_name: user.last_name,
        })
    }, [])


    return (
        <section className="flex flex-col gap-4">
            <h2 className="p-4 font-bold text-2xl">Edit Profile</h2>
            <EditPhoto photo={user?.photo} />
            <form>
                <FormControl className="flex gap-4 flex-row">
                    <TextField
                        id="first_name"
                        label="First name"
                        variant="outlined"
                        fullWidth
                        value={form.first_name}
                        required
                    />
                    <TextField
                        id="last_name"
                        label="Last name"
                        variant="outlined"
                        fullWidth
                        value={form.last_name}
                        required
                    />
                </FormControl>

                <FormControl className="flex gap-4 flex-row w-full justify-between">
                    <Button
                        color="error"
                        className="btn-danger"
                        onClick={() => setOpenEditProfile(false)}
                    >Cancel</Button>
                    <Button
                        className="btn-primary"
                        onClick={() => { }}
                    >Save</Button>

                </FormControl>
            </form >


        </section >
    )
}

