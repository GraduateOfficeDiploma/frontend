'use client'
import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
    Alert, AlertTitle,
    Fade,
    FormControl, IconButton,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import Course from "../../src/components/Course/Course";
import { useRouter } from 'next/router'
import PersonCard from "../../src/components/PersonCard/PersonCard";
import CreatAssignment from "../../src/components/CreateAssignment/CreatAssignment";
import IosShareIcon from '@mui/icons-material/IosShare';
import {useEffect} from "react";
import {useSession} from "next-auth/react";
import axios from "axios";

export default function CoursePage() {
    const router = useRouter();
    const [topics, setTopics] = React.useState('all');
    const [alertVisibility, setAlertVisibility] = React.useState(false);
    const [course, setCourse] = React.useState(null);
    const [isTeacher, setIsTeacher] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [tasks, setTasks] = React.useState([]);
    const session= useSession();

    useEffect(() => {
        if(session?.status === 'authenticated') {
            setIsTeacher(session?.data?.user?.role === 'teacher');
            setIsLoaded(true);

            handleGetCourseById();

            if(session?.data?.user?.role === 'student') {
                handleGetStudentsTasks();
            }
        }
    }, [session]);

    const handleGetStudentsTasks = () => {
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
            console.log('kuku error 1', error);
        });
    }

    const handleGetCourseById = () => {
        const courseId = router.query.course;

        if(courseId) {
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
                    console.log('kuku error 2', error);
                });
        }
    }

    const handleChangeYear = (event) => {
        setTopics(event.target.value);
    };

    const handleCopyCourseId = () => {
        navigator.clipboard.writeText(router.query.course);
        setAlertVisibility(true);
    }

    if(!isLoaded || !course || !tasks ) {
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
                <Typography sx={{fontWeight: 500}} variant="h4">{course.name}</Typography>
                <IconButton
                    onClick={handleCopyCourseId}
                >
                    <IosShareIcon sx={{color: 'black'}} />
                </IconButton>
            </Box>

            {/*<FormControl variant="filled" sx={{margin: '32px 0 40px', width: '240px'}}>*/}
            {/*    <InputLabel id="demo-simple-select-standard-label">Topics</InputLabel>*/}
            {/*    <Select*/}
            {/*        labelId="demo-simple-select-standard-label"*/}
            {/*        id="demo-simple-select-standard"*/}
            {/*        value={topics}*/}
            {/*        onChange={handleChangeYear}*/}
            {/*        label="Person"*/}
            {/*    >*/}
            {/*        <MenuItem value="all">All topics</MenuItem>*/}
            {/*        <MenuItem value="case_studies">Case studies</MenuItem>*/}
            {/*        <MenuItem value="topic2">Topic 2</MenuItem>*/}
            {/*    </Select>*/}
            {/*</FormControl>*/}

            { isTeacher &&
                <>
                    <Box
                        sx={{
                            marginTop: 2
                        }}
                    >
                        <CreatAssignment courseId={router.query.course} />
                    </Box>

                    <Box
                        sx={{
                            marginTop: 5,
                            marginBottom: 4
                        }}
                    >
                        <Typography sx={{fontWeight: 500, marginBottom: 2}} variant="h5">Students</Typography>

                        { course && course.members.map(member => {
                            if(member.user.role === "student") {
                                return (
                                    <PersonCard
                                        name={member.user.fullName}
                                        navigateTo={`/course/${router.query.course}/user/${member.user.id}`}
                                    />
                                );
                            }
                        })}
                    </Box>
                </>
            }

            { !isTeacher &&
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
                        { tasks.map((task, key) => {
                            return(
                                <Course handleGetStudentsTasks={handleGetStudentsTasks} id={key} isTeacher={isTeacher} task={task} />
                            );
                        })}

                    </Box>

                </Box>
            }

            <Box
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    left: 16,
                    width: '500px',
                    zIndex: 1500
                }}
            >
                <Fade
                    in={alertVisibility}
                    timeout={{enter: 100, exit: 100}}
                    addEndListener={() => {
                        const timeout = setTimeout(() => {
                            setAlertVisibility(false)

                            return clearTimeout(timeout);
                        }, 3000);
                    }}
                >
                    <Alert
                        sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        severity='success'
                        variant="standard"
                    >
                        <AlertTitle
                            sx={{
                                color: '#2e7d32',
                                lineHeight: '20px',
                                margin: 0,
                                padding: 0,
                            }}
                        >
                            Copied course id
                        </AlertTitle>
                    </Alert>
                </Fade>
            </Box>
        </Box>
    );
}
