'use client'
import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import Divider from "@mui/material/Divider";
import LinearProgress from '@mui/material/LinearProgress';
import PersonalPlanCard from "../src/components/PersonalPlanCard/PersonalPlanCard";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import {useEffect} from "react";
import axios from "axios";

function LinearProgressWithLabel(props) {
    const lightGrey = '#D9D9D9';
    const grey = '#8C8C8C';
    const { value } = props;

    return (
        <Box sx={{ position: "relative", display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: 6 }}>
            <Box sx={{ width: '100%' }}>
                <LinearProgress
                    sx={{
                        bgcolor: lightGrey,
                        height: '8px',
                        "& .MuiLinearProgress-barColorPrimary": {
                            backgroundColor: grey,
                        },
                    }}
                    variant="determinate"
                    {...props}
                />
            </Box>
            <Box
                sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            >
                <Box>
                    <Box
                        sx={{
                            position: "absolute",
                            width: '5px',
                            height: '18px',
                            bgcolor: value > 0 ? grey : lightGrey,
                            top: '-5px'
                        }}
                    />
                </Box>
                <Box>
                    <Box
                        sx={{
                            position: "absolute",
                            width: '5px',
                            height: '18px',
                            bgcolor: value > 24 ? grey : lightGrey,
                            top: '-5px',
                            transform: 'translate(-50%)'
                        }}
                    />
                </Box>
                <Box>
                    <Box
                        sx={{
                            position: "absolute",
                            width: '5px',
                            height: '18px',
                            bgcolor: value > 49 ? grey : lightGrey,
                            top: '-5px',
                            transform: 'translate(-50%)'
                        }}
                    />
                </Box>
                <Box>
                    <Box
                        sx={{
                            position: "absolute",
                            width: '5px',
                            height: '18px',
                            bgcolor: value > 74 ? grey : lightGrey,
                            top: '-5px',
                            transform: 'translate(-50%)'
                        }}
                    />
                </Box>
                <Box>
                    <Box
                        sx={{
                            position: "absolute",
                            width: '5px',
                            height: '18px',
                            bgcolor: value === 100 ? grey : lightGrey,
                            top: '-5px',
                            transform: 'translate(-100%)'
                        }}
                    />
                </Box>
            </Box>
            <Box
                sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '12px' }}
            >
                <Box>
                    <Typography
                        sx={{
                            position: "absolute"
                        }}
                    >
                        1st year
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        sx={{
                            position: "absolute",
                            transform: 'translate(-3px)',
                        }}
                    >
                        2nd year
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        sx={{
                            position: "absolute",
                            transform: 'translate(-3px)',
                        }}
                    >
                        3rd year
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        sx={{
                            position: "absolute",
                            transform: 'translate(-3px)',
                        }}
                    >
                        4th year
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        sx={{
                            position: "absolute",
                            transform: 'translate(-100%)',
                        }}
                    >
                        Graduated
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default function Personal_plan() {
    const [year, setYear] = React.useState('all');
    const [progress, setProgress] = React.useState(0);
    const [course, setCourse] = React.useState(null);
    const [tasks, setTasks] = React.useState([]);
    const router = useRouter();
    const session = useSession();
    const courseId = '50dc3f3a-ced8-4f83-98ef-966e579358c9'; // hardcoded created course

    useEffect(() => {
        if(session?.status === 'authenticated') {
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


            handleGetStudentTasks();
        }
    }, [session]);

    const handleGetStudentTasks = () => {
        const tasksPayload = {
            orderBy: {
                dueDate: "ASC"
            },
            filter: {
                course: {
                    id: courseId
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
            let counter = 0;

            response.data.forEach(task => {
                if(task.submissions[0]?.grade > 60) {
                    counter += 1;
                }
            })

            setProgress(counter * 25 / response.data.length);

            setTasks([...response.data.reverse()]);
        })
        .catch(function (error) {
            console.log('kuku error', error);
        });
    }

    const handleChangeYear = (event) => {
        setYear(event.target.value);
    };

    if(!course || !tasks) {
        return null;
    }

    return (
        <Box sx={{flexGrow: 1}} p={2}>
            <Typography sx={{fontWeight: 500, marginBottom: 4}} variant="h4">Personal plan</Typography>

            <Divider/>

            <FormControl variant="filled" sx={{margin: '32px 0 40px', width: '240px'}}>
                <InputLabel id="demo-simple-select-standard-label">Year</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={year}
                    onChange={handleChangeYear}
                    label="Person"
                >
                    <MenuItem value="all">All years</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                </Select>
            </FormControl>

            <LinearProgressWithLabel value={progress} />

            <Box>
                <Typography sx={{fontWeight: 500, marginBottom: 2}} variant="h5">1st year</Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    { tasks.map((task, key) => {
                        return (
                            <PersonalPlanCard getStudentTasks={handleGetStudentTasks} id={key} task={task} setProgress={setProgress} />
                        );
                    })}
                </Box>

            </Box>
        </Box>
    );
}
