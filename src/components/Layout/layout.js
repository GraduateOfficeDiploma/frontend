"use client"
import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportIcon from '@mui/icons-material/Support';
import LogoutIcon from '@mui/icons-material/Logout';
import ThemeRegistry from "../ThemeRegistry/ThemeRegistry";
import TaskIcon from '@mui/icons-material/Task';
import SchoolIcon from '@mui/icons-material/School';
import {signOut, useSession} from "next-auth/react"
import { usePathname } from 'next/navigation'

const STUDENT_LINKS = [
    {text: 'My courses', href: '/courses', icon: SchoolIcon},
    {text: 'Tasks', href: '/tasks', icon: TaskIcon},
    {text: 'Personal plan', href: '/personal_plan', icon: ChecklistIcon},
];

const TEACHER_LINKS = [
    {text: 'Courses', href: '/courses', icon: SchoolIcon},
    {text: 'Students plans', href: '/student_plan', icon: ChecklistIcon},
]

const PLACEHOLDER_LINKS = [
    {text: 'Settings', icon: SettingsIcon},
    {text: 'Support', icon: SupportIcon},
];

export default function RootLayout({children}) {
    const session = useSession();
    const pathname = usePathname();
    const isSignedIn = session.status === 'authenticated' || session.status === 'loading'
        && (pathname !== '/login' && pathname !== '/signup');
    const DRAWER_WIDTH = isSignedIn ? 240 : 0;

    let LINKS = TEACHER_LINKS;

    if(isSignedIn && session.status === 'authenticated') {
        LINKS = session?.data?.user?.role === 'teacher' ? TEACHER_LINKS : STUDENT_LINKS;
    }

    return (
        <ThemeRegistry>
            <AppBar position="fixed" sx={{zIndex: 999}}>
                <Toolbar sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor: 'background.paper'
                }}>
                    <Typography variant="h6" noWrap component="div" color="black">
                        Graduate Students Office
                    </Typography>

                    { isSignedIn &&
                        <ListItemButton onClick={() => signOut()} sx={{display: 'flex', flex: 'inherit'}}>
                            <ListItemText
                                sx={{color: 'black', marginRight: '10px'}}
                                primary={session?.data?.user?.name}
                            />
                            <ListItemIcon sx={{minWidth: 0}}>
                                <LogoutIcon/>
                            </ListItemIcon>
                        </ListItemButton>
                    }
                </Toolbar>
            </AppBar>
            { isSignedIn &&
                <Drawer
                    sx={{
                        width: DRAWER_WIDTH,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: DRAWER_WIDTH,
                            boxSizing: 'border-box',
                            top: ['48px', '56px', '64px'],
                            height: 'auto',
                            bottom: 0,
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Divider/>
                    <List>
                        {LINKS.map(({text, href, icon: Icon}) => (
                            <ListItem key={href} disablePadding>
                                <ListItemButton component={Link} href={href}>
                                    <ListItemIcon sx={{minWidth: 0, marginRight: 2}}>
                                        <Icon/>
                                    </ListItemIcon>
                                    <ListItemText primary={text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            }
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    ml: `${DRAWER_WIDTH}px`,
                    mt: ['48px', '56px', '64px'],
                    p: 3,
                }}
            >
                {children}
            </Box>
        </ThemeRegistry>
    );
}
