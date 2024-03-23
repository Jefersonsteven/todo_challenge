import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Image from 'next/image';

export const Header: React.FC = () => {
    return (
        <header className="flex justify-between p-8">
            <div className='flex gap-2 p-2 bg-gray-800 w-fit h-fit rounded-md justify-center border-slate-400 border-[0.5px] border-double'>
                <FormatListBulletedIcon />
                <h3>Todochallenge</h3>
            </div>
            <figure className='w-11 h-11 overflow-hidden rounded-full cursor-pointer'>
                <Image src="/assets/images/user_default.jpeg" alt="profile" width={415} height={415} />
            </figure>
        </header>
    );
}