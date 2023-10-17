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
import axios from "axios";

export default function StudentsPlansPage() {
    const [course, setCourse] = React.useState(null);
    const router = useRouter();
    const session= useSession();

    const courseId = 'c82d5422-e2d5-4810-90c5-2406ccae213c';

    useEffect(() => {
        if(session?.status === 'authenticated') {
            if(session?.data?.user?.role !== 'teacher') {
                router.push('/courses');
            }

            axios.get(`${process.env.BACKEND_URL}/api/courses/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${session.data.user.accessToken}`
                }
            })
            .then(function (response) {
                setCourse({...response.data});

                setIsLoaded(true);
            })
            .catch(function (error) {

            });
        }
    }, [session]);

    if(!course) {
        return null;
    }

    console.log('kuku', course)

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
                { course && course.members.map(member => {
                    if(member.user.role === "student") {
                        return (
                            <PersonCard
                                name={member.user.fullName}
                                navigateTo={`/student_plan/student/${member.user.id}`}
                            />
                        );
                    }
                })}
            </Box>
        </Box>
    );
}