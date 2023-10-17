'use client'
import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Course from "../../../../src/components/Course/Course";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {useSession} from "next-auth/react";
import axios from "axios";

export default function UserCoursePage() {
    const [course, setCourse] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [tasks, setTasks] = React.useState([]);
    const router = useRouter();
    const session = useSession();

    useEffect(() => {
        if(session?.status === 'authenticated') {
            const courseId = router.query.course;
            const userId = router.query.user;

            const tasksPayload = {
                orderBy: {
                    dueDate: "ASC"
                },
                filter: {
                    course: {
                        id: router.query.course
                    }
                }
            }

            axios.get(`${process.env.BACKEND_URL}/api/courses/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${session.data.user.accessToken}`
                }
            })
            .then(function (response) {
                setCourse({...response.data});
            })
            .catch(function (error) {
                console.log('kuku error', error);
            });


            axios.get(`${process.env.BACKEND_URL}/api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${session.data.user.accessToken}`
                }
            })
            .then(function (response) {
                setUser({...response.data});
            })
            .catch(function (error) {
                console.log('kuku error', error);
            });

            axios.get(`${process.env.BACKEND_URL}/api/tasks/`, {
                headers: {
                    Authorization: `Bearer ${session.data.user.accessToken}`
                },
                params: {
                    ...tasksPayload
                }
            })
            .then(function (response) {


                setTasks([...response.data]);
            })
            .catch(function (error) {
                console.log('kuku error', error);
            });
        }
    }, [session]);

    if(!course || !user || !tasks) {
        return null;
    }

    return (
        <Box sx={{flexGrow: 1}} p={2}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 2
                }}
            >
                <Typography sx={{fontWeight: 500}} variant="h4">{course.name}, {user.fullName}</Typography>
            </Box>

            <Box
                sx={{
                    marginTop: 5
                }}
            >
                <Typography sx={{fontWeight: 500, marginBottom: 2}} variant="h5">Assignments</Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    { tasks.map(task => <Course task={task} isTeacher />)}
                </Box>
            </Box>
        </Box>
    );
}