import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, auth } from '@/auth';

const Navbar = async () => {
    const session = await auth();

    return (
        <>
            <header className='px-5 py-3 bg-white shadow-sm text-black'>
                <nav className='flex justify-between items-center '>
                    <Link href='/'>
                        <h1 className='!text-2xl font-bold'>Pitch Center</h1>
                    </Link>

                    <div className='flex items-center gap-5'>
                        {session && session?.user ? (
                            <>
                                <Link href='/startup/create'>
                                    <span>Create</span>
                                </Link>

                                <form
                                    action={async () => {
                                        'use server';
                                        await signOut({ redirectTo: '/' });
                                    }}
                                >
                                    <button type='submit'>Logout</button>
                                </form>

                                <Link href={`/user/${session?.id}`}>
                                    <span>{session?.user?.name}</span>
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
