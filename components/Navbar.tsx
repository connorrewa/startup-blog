import Link from 'next/link';
import { signIn, signOut, auth } from '@/auth';
import { LogOut, BadgePlus } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

const Navbar = async () => {
    const session = await auth();

    return (
        <>
            <header className='px-5 py-3 bg-white shadow-sm text-black'>
                <nav className='flex justify-between items-center '>
                    <Link href='/'>
                        <h1 className='!text-2xl font-bold font-work-sans'>
                            Pitch Center
                        </h1>
                    </Link>

                    <div className='flex items-center gap-5'>
                        {session && session?.user ? (
                            <>
                                <Link href='/startup/create'>
                                    <span className='max-sm:hidden'>
                                        Create
                                    </span>
                                    <BadgePlus className='size-6 sm:hidden' />
                                </Link>

                                <form
                                    action={async () => {
                                        'use server';
                                        await signOut({ redirectTo: '/' });
                                    }}
                                >
                                    <button type='submit'>
                                        <span className='max-sm:hidden'>
                                            Logout{' '}
                                        </span>
                                        <LogOut className='size-6 sm:hidden text-red-500' />
                                    </button>
                                </form>

                                <Link href={`/user/${session?.id}`}>
                                    <Avatar className='size-10'>
                                        <AvatarImage
                                            src={session?.user?.image || ''}
                                            alt={session?.user?.name || ''}
                                        ></AvatarImage>
                                        <AvatarFallback>AV</AvatarFallback>
                                    </Avatar>
                                </Link>
                            </>
                        ) : (
                            <form
                                action={async () => {
                                    'use server';
                                    await signIn('github');
                                }}
                            >
                                <button type='submit'>login</button>
                            </form>
                        )}
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Navbar;
