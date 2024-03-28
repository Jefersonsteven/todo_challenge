import { errorImageManagement } from "@/utils/controllerImage"
import { Button } from "@mui/material"
import Image from "next/image"

interface Props {
    photo: string | undefined
}

export const EditPhoto = ({ photo }: Props) => {

    return (
        <figure className="relative w-fit p-4">
            <Image
                src={errorImageManagement(photo)}
                alt="me"
                width={415}
                height={415}
                className="rounded-full border-4 border-gray-800 w-40"
            />
            <Button className="w-fit h-fit rounded-full absolute bottom-0 right-0 bg-gray-800 hover:bg-gray-800">
                🖋️ {/* TODO: Cambiar por  un icono */}
            </Button>
        </figure>
    )
}