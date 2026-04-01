"use client";

import { ChildrenProps } from '@/types';
import { useSession } from '../hooks/useSession'

const AuthLayer = ({ children }: ChildrenProps) => {
    const {isLoading} = useSession();

    if (isLoading) return <div className='text-center'>Loading...</div>

    return (
        <>{children}</>
    )
}

export default AuthLayer;