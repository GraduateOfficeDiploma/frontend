'use client';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import {TextField, Box, Link} from "@mui/material";
import { grey } from '@mui/material/colors';
import Button from "@mui/material/Button";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const router = useRouter();
    const handleLogin = () => {
        axios.post('http://localhost:8010/api/auth/login', {
            email: email,
            password: password
        })
        .then(function (response) {
            if(response.status === 201) {
                router.push('/courses');
            }
        })
        .catch(function (error) {

        });
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: 'calc(100vh - 112px)',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    padding: '32px 40px 40px',
                    border: `1px solid ${grey[300]}`,
                    width: '100%',
                    maxWidth: '520px',
                    marginTop: '10%',
                    height: 'fit-content'
                }}
            >
                <Typography sx={{textAlign: 'center', fontWeight: 700 }} variant="h3">Login</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}
                >
                    <TextField
                        variant="filled"
                        margin="normal"
                        label="Email Address"
                        type="email"
                        fullWidth
                        sx={{
                            margin: '24px 0 0'
                        }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="filled"
                        margin="normal"
                        label="Password"
                        type="password"
                        fullWidth
                        sx={{
                            margin: '24px 0 0'
                        }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{
                            margin: '24px 0 0',
                            color: 'white',
                            background: grey[900],
                            textTransform: 'none',
                            '&.MuiButton-root:hover': {
                                bgcolor: grey[800],
                            }
                        }}
                        onClick={handleLogin}
                    >
                        Log In
                    </Button>
                    <Typography
                        sx={{
                            textAlign: 'center',
                            margin: '16px 0 0',
                        }}
                        variant="body1"
                    >
                        No account? <Link sx={{color: grey[900]}} href="/signup">Sign up</Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
