import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "",
            credentials: {},

            async authorize(credentials) {
                const config = {
                    url: '',
                    payload: {}
                };

                switch (credentials.type) {
                    case 'login':
                        config.url = `${process.env.BACKEND_URL}/api/auth/login`;
                        config.payload.email = credentials.email;
                        config.payload.password = credentials.password;
                        break;
                    case 'signup':
                        config.url = `${process.env.BACKEND_URL}/api/users`;
                        config.payload.email = credentials.email;
                        config.payload.password = credentials.password;
                        config.payload.fullName = credentials.fullName;

                        break;
                    default:
                        break;
                }

                return axios.post(config.url, config.payload)
                .then(function (response) {
                    if(response && response.status === 201) {
                        return {
                            ...response.data.user,
                            accessToken: response.data.accessToken,
                            name: response.data.user.fullName
                        };
                    }

                    return null;
                })
                .catch(function (error) {
                    return null;
                });
            },
        }),
    ],
    secret: 'mySecret',
    callbacks: {
        async jwt({ token, user, account }) {
            return {
                ...token,
                ...user
            };
        },

        async session({ session, token }) {
            console.log('kuku session token', token);

            session.user.accessToken = token.accessToken;
            session.user.fullName = token.fullName;
            session.user.role = token.role;

            return session;
        },
    },
})