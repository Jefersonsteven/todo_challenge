import { User } from '@/types';
import { errorImageManagement } from '@/utils/controllerImage';
import { getUser } from '@/utils/getUser';
import Image from 'next/image';
import { use, useEffect, useState } from 'react';

export const ImageProfile: React.FC = () => {
    const [src, setSrc] = useState<string | undefined>('');

    useEffect(() => {
        const user = getUser();
        if (user === null) return;
        setSrc(user?.photo);
    }, []);


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