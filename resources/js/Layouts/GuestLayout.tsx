import { router, usePage } from '@inertiajs/react';
import { PropsWithChildren, useEffect } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    const user = usePage().props.auth.user;

    useEffect(() => {
        if (user) {
            router.visit(route('dashboard'));
        }
    }, [user]);

    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 dark:bg-gray-900 sm:justify-center sm:pt-0">
            {children}
        </div>
    );
}
