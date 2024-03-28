import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Link from 'next/link';
import { useState } from 'react';
import { Settings } from './Settings';
import { ImageProfile } from './ImageProfile';
import { Box, Modal } from '@mui/material';
import { EditProfile } from './EditProfile';

export const Header: React.FC = () => {
    const [openSettings, setOpenSettings] = useState(false);
    const [openEditProfile, setOpenEditProfile] = useState(false);

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
                {openSettings && <Settings setOpenEditProfile={setOpenEditProfile} />}
            </figure>

            {/* DetailTodo component modal is used here */}
            <Modal
                open={openEditProfile}
                onClose={() => setOpenEditProfile(false)}
                aria-labelledby="Detail Todo Challenge"
                aria-describedby="Detail of a todo challenge"
                className="flex justify-end items-start backdrop-blur-sm pt-8"
            >
                <Box className=" p-8 bg-stone-50 rounded-s-3xl animate-slide-left">
                    <EditProfile setOpenEditProfile={setOpenEditProfile} />
                </Box>
            </Modal>
        </header>
    );
}