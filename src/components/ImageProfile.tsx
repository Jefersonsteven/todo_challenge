import { User } from '@/types';
import Image from 'next/image';
import { use, useEffect, useState } from 'react';

export const ImageProfile: React.FC = () => {
    const [src, setSrc] = useState<string | undefined>('');

    useEffect(() => {
        const user = localStorage.getItem('user');
        const userObj: User | undefined = user ? JSON.parse(user) : null;

        setSrc(userObj?.photo);

        // TODO: decidirme por dejarlo asi o usar un estado global
    }, []);

    const errorImageManagement = (src: string | undefined) => {
        if (src === undefined || src === 'none' || src === '' || src === null) {
            return '/assets/images/user_default.jpeg';
        }
        return src;
    }

    return (
        <>
            <Image
                className='rounded-full'
                src={errorImageManagement(src)}
                alt="profile"
                width={415}
                height={415}
            />
        </>
    )
}