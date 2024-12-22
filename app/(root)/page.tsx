import React from 'react';
import SearchForm from '../../components/SearchForm';
import StartupCard from '@/components/StartupCard';

const page = async ({
    searchParams,
}: {
    searchParams: Promise<{ query?: string }>;
}) => {
    const query = (await searchParams).query;

    const posts = [
        {
            _createdAt: new Date(),
            views: 55,
            author: { _id: 1, name: 'Adrian' },
            _id: 1,
            description: 'This is a description',
            image: 'https://plus.unsplash.com/premium_photo-1723809781423-df48d47106d1?q=80&w=1465&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            category: 'Robots',
            title: 'we robots',
        },
    ];
    return (
        <>
            <section className='pink_container'>
                <h1 className='heading'>
                    Pitch your startup <br /> Connect with Entrepreneurs
                </h1>
                <p className='sub-heading !max-w-3xl'>
                    Submit Ideas, vote on pitches, and get noticed in
                    competitions.
                </p>
                <SearchForm query={query} />
            </section>

            <section className='section_container'>
                <p className='text-30-semibold'>
                    {query ? `Search results for "${query}"` : 'All Startups'}
                </p>

                <ul className='mt-7 card_grid'>
                    {posts?.length > 0 ? (
                        posts.map((post: StartupCardType, index: number) => (
                            <StartupCard key={post?._id} post={post} />
                        ))
                    ) : (
                        <p className='no-results'>No startups found</p>
                    )}
                </ul>
            </section>
        </>
    );
};

export default page;
