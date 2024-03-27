import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Link from 'next/link';
import { useState } from 'react';
import { Settings } from './Settings';
import { ImageProfile } from './ImageProfile';

export const Header: React.FC = () => {
    const [openSettings, setOpenSettings] = useState(false);
    return (
        <header className="flex justify-between p-8 w-full h-fit">
            <Link href="/" className='flex gap-2 p-2 bg-gray-800 w-fit h-fit rounded-md justify-center text-white' title='Go to landing'>
                <FormatListBulletedIcon />
                <h3>Todochallenge</h3>
            </Link>
            <figure
                onClick={() => setOpenSettings(!openSettings)}
                className='w-11 h-11 rounded-full cursor-pointer border-4 border-gray-800 relative'
            >
                <ImageProfile />
                {openSettings && <Settings />}
            </figure>
        </header>
    );
}