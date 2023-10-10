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

function LinearProgressWithLabel(props) {
    const lightGrey = '#D9D9D9';
    const grey = '#8C8C8C';

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
                            bgcolor: grey,
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
                            bgcolor: grey,
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
                            bgcolor: lightGrey,
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
                            bgcolor: lightGrey,
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
                            bgcolor: lightGrey,
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
                        1st year
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
    const [progress, setProgress] = React.useState(25);

    const handleChangeYear = (event) => {
        setYear(event.target.value);
    };

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
                    <PersonalPlanCard />
                    <PersonalPlanCard />
                    <PersonalPlanCard />
                </Box>

            </Box>
        </Box>
    );
}
