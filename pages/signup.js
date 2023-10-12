'use client';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import {TextField, Box, Link, FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import { grey } from '@mui/material/colors';
import Button from "@mui/material/Button";
import axios from "axios";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";


export default function Signup({ user }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [role, setRole] = React.useState('');
    const router = useRouter();

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    const handleSignUp = () => {
        axios.post('http://localhost:8010/api/users', {
            role: 'guest',
            fullName: name,
            email: email,
            password: password
        })
        .then(async function (response) {
            if(response.status === 201) {
                const res = await signIn(
                    "credentials",
                    {
                        redirect: false,
                        email: email,
                        password: password,
                        callbackUrl: `${window.location.origin}/courses`,
                        type: 'login',
                    }
                );

                if (res.url) {
                    router.push(res.url);
                }
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
                <Typography sx={{textAlign: 'center', fontWeight: 700 }} variant="h3">Create Account</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}
                >
                    <FormControl fullWidth variant="filled" sx={{ margin: '24px 0 0' }}>
                        <InputLabel id="demo-simple-select-standard-label">Person</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={role}
                            onChange={handleChange}
                            label="Person"
                        >
                            <MenuItem value="student">Student</MenuItem>
                            <MenuItem value="teacher">Teacher</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        variant="filled"
                        margin="normal"
                        label="Full name"
                        type="text"
                        fullWidth
                        sx={{
                            margin: '24px 0 0'
                        }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
                        onClick={handleSignUp}
                    >
                        Create account
                    </Button>
                    <Typography
                        sx={{
                            textAlign: 'center',
                            margin: '16px 0 0',
                        }}
                        variant="body1"
                    >
                        Have an account? <Link sx={{color: grey[900]}} href="/login">Log in</Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
