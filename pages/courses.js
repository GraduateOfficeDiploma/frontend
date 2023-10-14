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
import {getSession, useSession} from "next-auth/react";
import {useEffect} from "react";

// export async function getStaticProps(context) {
//     const session = await getSession(context);
//
//     try {
//         console.log('kuku token', context);
//
//         const response = axios.get(`${process.env.BACKEND_URL}/api/courses`, {
//             headers: {
//                 Authorization: `Bearer ${session.data.user.accessToken}`
//             }
//         });
//
//         console.log('kuku data 1', response)
//
//         return {
//             props: {
//                 data: response
//             }
//         }
//     } catch (error) {
//         console.log('kuku data 2', error)
//     }
//
//     return {
//         props: {
//             data: 'error'
//         }
//     };
// }

export default function Courses() {
    const [courses, setCourses] = React.useState([]);
    const [alertVisibility, setAlertVisibility] = React.useState({visible: false, type: '', message: ''});
    const session = useSession();

    console.log('kuku here', courses)

    useEffect(() => {
        if(session?.status === 'authenticated') {
            axios.get(`${process.env.BACKEND_URL}/api/courses`, {
                headers: {
                    Authorization: `Bearer ${session.data.user.accessToken}`
                }
            })
            .then(function (response) {
                setCourses([...response.data]);
            })
            .catch(function (error) {
                console.log('kuku', error)
            });
        }
    }, [session]);

    return (
        <Box sx={{ flexGrow: 1 }} p={2}>
            <Box
                sx={{
                    position: 'absolute',
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
                <AddCourse />
                <CreateCourse
                    alertVisibility={alertVisibility}
                    setAlertVisibility={setAlertVisibility}
                />
                <CreatAssignment />
            </Grid>
        </Box>
    );
}
