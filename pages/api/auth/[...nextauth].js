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
                        config.url = `http://localhost:8010/api/auth/login`;
                        config.payload.email = credentials.email;
                        config.payload.password = credentials.password;
                        break;
                    case 'signup':
                        config.url = `http://localhost:8010/api/users`;
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
                            accessToken: response.data.accessToken
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
            console.log('kuku jwt', token, user, account);

            return token;
        },

        async session({ session, token }) {
            console.log('kuku', session, token);

            session.user.accessToken = token.accessToken;
            session.user.fullName = token.fullName;

            return session;
        },
    },
})