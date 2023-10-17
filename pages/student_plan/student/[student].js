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
import PersonalPlanCard from "../../../src/components/PersonalPlanCard/PersonalPlanCard";
import AddStudent from "../../../src/components/AddStudent/AddStudent";
import CreatAssignment from "../../../src/components/CreateAssignment/CreatAssignment";
import {useEffect} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";

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

export default function Student_plan() {
    const [year, setYear] = React.useState('all');
    const [progress, setProgress] = React.useState(0);
    const [course, setCourse] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [tasks, setTasks] = React.useState([]);
    const router = useRouter();
    const session = useSession();
    const courseId = 'c82d5422-e2d5-4810-90c5-2406ccae213c';

    useEffect(() => {
        if(session?.status === 'authenticated') {
            const userId = router.query.student;

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

            handleGetTasks();
        }
    }, [session]);

    const handleChangeYear = (event) => {
        setYear(event.target.value);
    };

    const handleGetTasks = () => {
        const userId = router.query.student;

        const tasksPayload = {
            orderBy: {
                dueDate: "ASC"
            },
            filter: {
                course: {
                    id: courseId,
                    members: {
                        user: userId,
                    },
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
                setTasks([...response.data.reverse()]);
            })
            .catch(function (error) {
                console.log('kuku error', error);
            });
    }

    if(!course || !user || !tasks) {
        return null;
    }

    return (
        <Box sx={{flexGrow: 1}} p={2}>
            <Box
                sx={{
                    marginBottom: 4
                }}
            >
                <Typography sx={{fontWeight: 500}} variant="h4">{user.fullName}</Typography>

                <Box
                    sx={{
                        marginTop: 2
                    }}
                >
                    <CreatAssignment courseId={courseId} isStudentsPersonalPlan />
                </Box>
            </Box>

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
                            <PersonalPlanCard getStudentTasks={handleGetTasks} id={key} task={task} setProgress={setProgress} />
                        );
                    })}
                </Box>

            </Box>
        </Box>
    );
}
