import Link from "next/link";

export default function Home() {
  return (
    <>
      <a href="/home" className="flex gap-2 p-2 bg-gray-800 w-fit h-fit rounded-md justify-center text-white">
        Home
      </a>
      <a href="/login" className="flex gap-2 p-2 bg-gray-800 w-fit h-fit rounded-md justify-center text-white">
        Inicar sesion
      </a>
      <a href="/signup" className="flex gap-2 p-2 bg-gray-800 w-fit h-fit rounded-md justify-center text-white">
        Registrarse
      </a>
    </>
  );
}
