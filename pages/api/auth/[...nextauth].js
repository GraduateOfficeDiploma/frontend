import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            id: "login",
            credentials: {
                email: {label: 'Email', type: 'text'},
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials) {
                console.log('kuku send request login');

                axios.post('http://localhost:8010/login', {
                    credentials
                })
                    .then(function (response) {
                        console.log(response);

                        return response;
                    })
                    .catch(function (error) {
                        return null;
                    });
            },
        }),
        CredentialsProvider({
            id: "signup",
            credentials: {
                fullName: {label: 'FullName', type: 'text'},
                email: {label: 'Email', type: 'text'},
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials) {
                console.log('kuku send request signup');

                axios.post('http://localhost:8010/users',
                    credentials
                )
                    .then(function (response) {
                        console.log(response);

                        if(response) {

                        }
                    })
                    .catch(function (error) {
                        return null;
                    });
            },
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            console.log('kuku', user)

            if (user) return true;

            return false;
        },
        jwt: async ({token, user}) => {
            if (user) {
                token.data = user.id
            }
            return token
        },
        session: async ({session, token}) => {
            if (token.data) {
                session.user = token.data
            }
            return session
        },
    },
}

export default NextAuth(authOptions)