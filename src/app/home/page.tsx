import { Header } from "@/components/Header"
import AddIcon from '@mui/icons-material/Add';

const HomePage: React.FC = () => {
    const [firstname, lastname] = ['John', 'Doe']
    return (
        <>
            <Header />
            <main className=" p-8 flex flex-col gap-4">
                <h1 className=" font-bold text-4xl">Hello😊!! {firstname} {lastname}.</h1>
                <div className="w-full flex justify-end">
                    <button className="flex gap-2 px-6 py-4 bg-gray-800 w-fit h-fit rounded-full justify-center text-white">
                        Create New Todochallenge
                        <AddIcon />
                    </button>
                </div>
            </main>
        </>
    )
}

export default HomePage