import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { client } from './sanity/lib/client';
import { AUTHOR_BY_GITHUB_ID_QUERY } from './sanity/lib/queries';
import { writeClient } from './sanity/lib/write-client';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub],
    callbacks: {
        async signIn({ user, profile }) {
            const { id, login, bio } = profile;
            const { name, email, image } = user;

            const existingUser = await client
                .withConfig({ useCdn: false })
                .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });

            if (!existingUser) {
                await writeClient.create({
                    _type: 'author',
                    id,
                    name,
                    username: login,
                    email,
                    image,
                    bio: bio || '',
                });
            }

            return !!existingUser;
        },
        async jwt({ token, account, profile }) {
            if (account && profile) {
                const user = await client
                    .withConfig({ useCdn: false })
                    .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile.id });

                if (user) {
                    token.id = user._id;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token && token.id) {
                session.id = token.id;
            }
            return session;
        },
    },
});
