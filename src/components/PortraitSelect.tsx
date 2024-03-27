import { ErrorsTodoCreate, TodoCreate } from "@/types"
import Image from "next/image"
import { Dispatch, SetStateAction } from "react"

interface Props {
    form: TodoCreate
    error: string
    setForm: Dispatch<SetStateAction<TodoCreate>>
    setErrors: Dispatch<SetStateAction<ErrorsTodoCreate>>

}

export const PortraitSelect: React.FC<Props> = ({ form, setForm, setErrors, error }) => {
    const handleSelectImage = (e: React.MouseEvent<HTMLImageElement>) => {
        const image = e.currentTarget.alt
        setForm({ ...form, portrait: `${image}.jpeg` })
    }

    return (
        <label htmlFor="">
            Portrait
            <div className="flex flex-wrap gap-4 py-4">
                <Image onClick={handleSelectImage} title="Todos" className={` cursor-pointer rounded-xl ${form.portrait === 'todos.jpeg' ? 'border-4 border-green-500' : ''}`} src='/assets/images/todos.jpeg' alt="todos" width={100} height={100} />
                <Image onClick={handleSelectImage} title="Entertaiment" className={` cursor-pointer rounded-xl ${form.portrait === 'entertaiment.jpeg' ? 'border-4 border-green-500' : ''}`} src='/assets/images/entertaiment.jpeg' alt="entertaiment" width={100} height={100} />
                <Image onClick={handleSelectImage} title="Studying" className={` cursor-pointer rounded-xl ${form.portrait === 'studying.jpeg' ? 'border-4 border-green-500' : ''}`} src='/assets/images/studying.jpeg' alt="studying" width={100} height={100} />
                <Image onClick={handleSelectImage} title="Job" className={` cursor-pointer rounded-xl ${form.portrait === 'job.jpeg' ? 'border-4 border-green-500' : ''}`} src='/assets/images/job.jpeg' alt="job" width={100} height={100} />
                <Image onClick={handleSelectImage} title="Personal" className={` cursor-pointer rounded-xl ${form.portrait === 'personal.jpeg' ? 'border-4 border-green-500' : ''}`} src='/assets/images/personal.jpeg' alt="personal" width={100} height={100} />
                <Image onClick={handleSelectImage} title="Social" className={` cursor-pointer rounded-xl ${form.portrait === 'social.jpeg' ? 'border-4 border-green-500' : ''}`} src='/assets/images/social.jpeg' alt="social" width={100} height={100} />
                <Image onClick={handleSelectImage} title="Travel" className={` cursor-pointer rounded-xl ${form.portrait === 'travel.jpeg' ? 'border-4 border-green-500' : ''}`} src='/assets/images/travel.jpeg' alt="travel" width={100} height={100} />
                <Image onClick={handleSelectImage} title="Home" className={` cursor-pointer rounded-xl ${form.portrait === 'home.jpeg' ? 'border-4 border-green-500' : ''}`} src='/assets/images/home.jpeg' alt="home" width={100} height={100} />
                <Image onClick={handleSelectImage} title="Finance" className={` cursor-pointer rounded-xl ${form.portrait === 'finance.jpeg' ? 'border-4 border-green-500' : ''}`} src='/assets/images/finance.jpeg' alt="finance" width={100} height={100} />
            </div>
            <span>{error}</span>
        </label>
    )
}