import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Image from 'next/image';
import Link from 'next/link';

export const Header: React.FC = () => {
    return (
        <header className="flex justify-between p-8 w-full h-fit">
            <Link href="/" className='flex gap-2 p-2 bg-gray-800 w-fit h-fit rounded-md justify-center text-white' title='Go to landing'>
                <FormatListBulletedIcon />
                <h3>Todochallenge</h3>
            </Link>
            <figure className='w-11 h-11 overflow-hidden rounded-full cursor-pointer border-4 border-gray-800'>
                <Image src="/assets/images/user_default.jpeg" alt="profile" width={415} height={415} />
            </figure>
        </header>
    );
}