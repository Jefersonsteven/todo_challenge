import { Button } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const Settings = () => {
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove('token');
        localStorage.removeItem('user');
        router.push('/');
    }

    return (
        <div className="border-2 bg-gray-800 absolute p-4 flex flex-col gap-4 rounded-2xl right-0 top-12 z-[1]">
            <Button variant="contained" color="primary">Profile</Button>
            <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
            >Logout</Button>
        </div>
    );
}