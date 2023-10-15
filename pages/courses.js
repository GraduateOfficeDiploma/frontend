'use client'
import * as React from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CourseCard from "../src/components/CourseCard/CourseCard";
import AddCourse from "../src/components/AddCourse/AddCourse";
import CreateCourse from "../src/components/CreateCourse/CreateCourse";
import CreatAssignment from "../src/components/CreateAssignment/CreatAssignment";
import {Alert, AlertTitle, Fade} from "@mui/material";
import axios from "axios";
import {useSession} from "next-auth/react";
import {useEffect} from "react";

export default function Courses() {
    const [courses, setCourses] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [alertVisibility, setAlertVisibility] = React.useState({visible: false, type: '', message: ''});
    const session = useSession();

    useEffect(() => {
        if(session?.status === 'authenticated') {
            axios.get(`${process.env.BACKEND_URL}/api/courses`, {
                headers: {
                    Authorization: `Bearer ${session.data.user.accessToken}`
                }
            })
            .then(function (response) {
                setCourses([...response.data]);

                setIsLoaded(true);
            })
            .catch(function (error) {

            });
        }
    }, [session]);

    if(!isLoaded) {
        return null;
    }

    return (
        <Box sx={{ flexGrow: 1 }} p={2}>
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
                    in={alertVisibility.visible}
                    timeout={{enter: 100, exit: 100}}
                    addEndListener={() => {
                        const timeout = setTimeout(() => {
                            setAlertVisibility({visible: false, type: ''})

                            return clearTimeout(timeout);
                        }, 4000);
                    }}
                >
                    <Alert
                        sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        severity={alertVisibility.type}
                        variant="standard"
                    >
                        <AlertTitle
                            sx={{
                                color: alertVisibility.type === 'success' ? '#2e7d32' : '#d32f2f',
                                lineHeight: '20px',
                                margin: 0,
                                padding: 0,
                            }}
                        >
                            { alertVisibility.message }
                        </AlertTitle>
                    </Alert>
                </Fade>
            </Box>
            <Typography sx={{ fontWeight: 500, marginBottom: 3 }} variant="h4">My Courses</Typography>
            <Grid container spacing={2}>
                { courses.map(course => (
                    <CourseCard course={course} />
                ))}
                <AddCourse
                    setCourses={setCourses}
                />
                <CreateCourse
                    alertVisibility={alertVisibility}
                    setAlertVisibility={setAlertVisibility}
                    setCourses={setCourses}
                />
                <CreatAssignment />
            </Grid>
        </Box>
    );
}
