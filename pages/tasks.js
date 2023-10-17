'use client'
import * as React from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import TaskCard from "../src/components/TaskCard/TaskCard";
import {useEffect} from "react";
import axios from "axios";
import {useSession} from "next-auth/react";

export default function Tasks() {
    const [course, setCourse] = React.useState('all');
    const [tasks, setTasks] = React.useState([]);
    const [toDoTasks, setToDoTasks] = React.useState([]);
    const [missingTasks, setMissingTasks] = React.useState([]);
    const [doneTasks, setDoneTasks] = React.useState([]);
    const session = useSession();

    useEffect(() => {
        if (session?.status === 'authenticated') {
            const tasksPayload = {
                orderBy: {
                    dueDate: "ASC"
                }
            }

            axios.get(`${process.env.BACKEND_URL}/api/tasks/`, {
                headers: {
                    Authorization: `Bearer ${session.data.user.accessToken}`
                },
                params: {
                    tasksPayload
                }
            })
            .then(function (response) {
                console.log('kuku response', response)

                setTasks([...response.data]);
            })
            .catch(function (error) {
                console.log('kuku error', error);
            });
        }
    }, [session]);

    const handleChangeCourse = (event) => {
        setCourse(event.target.value);
    };

    return (
        <Box sx={{flexGrow: 1}} p={2}>
            <Typography sx={{fontWeight: 500, marginBottom: 4}} variant="h4">Tasks</Typography>

            <FormControl variant="filled" sx={{margin: '0 0 40px', width: '240px'}}>
                <InputLabel id="demo-simple-select-standard-label">Course</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={course}
                    onChange={handleChangeCourse}
                    label="Person"
                >
                    <MenuItem value="all">All courses</MenuItem>
                    <MenuItem value="english">English</MenuItem>
                    <MenuItem value="math">Math</MenuItem>
                </Select>
            </FormControl>

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Typography sx={{fontWeight: 500, marginBottom: 2}} variant="h5">To do</Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TaskCard/>
                        </Grid>
                        <Grid item xs={12}>
                            <TaskCard/>
                        </Grid>
                        <Grid item xs={12}>
                            <TaskCard/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{fontWeight: 500, marginBottom: 2}} variant="h5">Missing</Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TaskCard/>
                        </Grid>
                        <Grid item xs={12}>
                            <TaskCard/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{fontWeight: 500, marginBottom: 2}} variant="h5">Done</Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TaskCard/>
                        </Grid>
                        <Grid item xs={12}>
                            <TaskCard/>
                        </Grid>
                        <Grid item xs={12}>
                            <TaskCard/>
                        </Grid>
                        <Grid item xs={12}>
                            <TaskCard/>
                        </Grid>
                        <Grid item xs={12}>
                            <TaskCard/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
