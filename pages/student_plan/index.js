'use client'
import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
    IconButton,
} from "@mui/material";
import { useRouter } from 'next/router'
import PersonCard from "../../src/components/PersonCard/PersonCard";
import IosShareIcon from '@mui/icons-material/IosShare';
import {useEffect} from "react";
import {useSession} from "next-auth/react";
import Divider from "@mui/material/Divider";
import CreatAssignment from "../../src/components/CreateAssignment/CreatAssignment";
import AddStudent from "../../src/components/AddStudent/AddStudent";

export default function StudentsPlansPage() {
    const router = useRouter();
    const session= useSession();

    useEffect(() => {
        if(session?.status === 'authenticated') {
            if(session?.data?.user?.role !== 'teacher') {
                router.push('/courses');
            }
        }
    }, [session]);

    return (
        <Box sx={{flexGrow: 1}} p={2}>
            <Box
                sx={{
                    marginBottom: 4
                }}
            >
                <Typography sx={{fontWeight: 500}} variant="h4">Students</Typography>

                <Box
                    sx={{
                        marginTop: 2
                    }}
                >
                    <AddStudent />
                </Box>
            </Box>

            <Divider />

            <Box
                sx={{
                    marginTop: 4,
                    marginBottom: 4
                }}
            >
                <PersonCard navigateTo={`/student_plan/student/1`} />
                <PersonCard navigateTo={`/student_plan/student/1`} />
                <PersonCard navigateTo={`/student_plan/student/1`} />
                <PersonCard navigateTo={`/student_plan/student/1`} />
            </Box>
        </Box>
    );
}